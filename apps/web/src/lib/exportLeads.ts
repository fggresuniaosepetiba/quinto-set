import ExcelJS from "exceljs";
import type { Lead } from "@quinto-set/contracts";

type Row = Record<string, string | number | boolean | null | undefined>;

const HEADER_FONT: Partial<ExcelJS.Font> = {
  bold: true,
  color: { argb: "FFFFFFFF" },
};
const HEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF00143C" },
};

function addSheet(
  workbook: ExcelJS.Workbook,
  name: string,
  columns: string[],
  rows: Row[],
): void {
  const sheet = workbook.addWorksheet(name);
  sheet.addRow(columns);
  sheet.getRow(1).eachCell((cell) => {
    cell.font = HEADER_FONT;
    cell.fill = HEADER_FILL;
  });
  rows.forEach((row) => sheet.addRow(columns.map((col) => row[col] ?? "")));
  sheet.columns.forEach((column, index) => {
    const maxLength = columns[index]?.length ?? 10;
    column.width = Math.min(Math.max(maxLength + 4, 14), 60);
  });
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: columns.length },
  };
}

export function buildLeadsWorkbook(leads: Lead[]): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Quinto Set";
  workbook.created = new Date();

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString("pt-BR");

  const formatBirthDate = (iso: string): string =>
    iso ? iso.split("-").reverse().join("/") : "";

  const contacts = leads.filter((lead) => lead.type === "contact");
  addSheet(
    workbook,
    "Contatos",
    ["Nome", "E-mail", "Telefone", "Assunto", "Mensagem", "Data de cadastro"],
    contacts.map((lead) => {
      const data = lead.data as Extract<Lead["data"], { name: string }>;
      return {
        Nome: data.name,
        "E-mail": data.email,
        Telefone: data.phone ?? "",
        Assunto: data.subject ?? "",
        Mensagem: data.message,
        "Data de cadastro": formatDate(lead.createdAt),
      };
    }),
  );

  const enrollments = leads.filter((lead) => lead.type === "enrollment");
  addSheet(
    workbook,
    "Inscrições",
    [
      "Nome do aluno",
      "Data de nascimento",
      "Sexo",
      "Telefone",
      "E-mail",
      "Endereço",
      "Escola",
      "Série",
      "Categoria",
      "Responsável",
      "Parentesco",
      "Telefone do responsável",
      "E-mail do responsável",
      "Data de cadastro",
    ],
    enrollments.map((lead) => {
      const data = lead.data as Extract<
        Lead["data"],
        { student: Record<string, string>; guardian: Record<string, string> }
      >;
      return {
        "Nome do aluno": data.student.name,
        "Data de nascimento": formatBirthDate(data.student.birthDate),
        Sexo: data.student.sex,
        Telefone: data.student.phone,
        "E-mail": data.student.email ?? "",
        Endereço: data.student.address,
        Escola: data.student.school,
        Série: data.student.grade,
        Categoria: data.student.category,
        Responsável: data.guardian.name,
        Parentesco: data.guardian.relationship,
        "Telefone do responsável": data.guardian.phone,
        "E-mail do responsável": data.guardian.email,
        "Data de cadastro": formatDate(lead.createdAt),
      };
    }),
  );

  const sponsors = leads.filter((lead) => lead.type === "sponsor");
  addSheet(
    workbook,
    "Patrocinadores",
    [
      "Empresa",
      "Segmento",
      "Contato",
      "Telefone",
      "E-mail",
      "Cidade",
      "UF",
      "Tipo de apoio",
      "Mensagem",
      "Data de cadastro",
    ],
    sponsors.map((lead) => {
      const data = lead.data as Extract<Lead["data"], { company: string }>;
      return {
        Empresa: data.company,
        Segmento: data.segment,
        Contato: data.contactName,
        Telefone: data.phone,
        "E-mail": data.email,
        Cidade: data.city ?? "",
        UF: data.state ?? "",
        "Tipo de apoio": data.support ?? "",
        Mensagem: data.message ?? "",
        "Data de cadastro": formatDate(lead.createdAt),
      };
    }),
  );

  return workbook;
}

export async function downloadLeadsWorkbook(leads: Lead[]): Promise<void> {
  const workbook = buildLeadsWorkbook(leads);
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `leads-quinto-set-${new Date().toISOString().slice(0, 10)}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
