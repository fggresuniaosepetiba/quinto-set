export type LeadValidationIssue = {
  path: string;
  message: string;
};

export class LeadValidationError extends Error {
  readonly issues: LeadValidationIssue[];

  constructor(issues: LeadValidationIssue[]) {
    super("Alguns dados estão inválidos. Confira o formulário.");
    this.name = "LeadValidationError";
    this.issues = issues;
  }
}

export function mapServerIssues(
  issues: LeadValidationIssue[],
  pathToField: Record<string, string>,
): { fields: Record<string, string>; unmapped: LeadValidationIssue[] } {
  const fields: Record<string, string> = {};
  const unmapped: LeadValidationIssue[] = [];

  for (const issue of issues) {
    const field = pathToField[issue.path];
    if (field) fields[field] = issue.message;
    else unmapped.push(issue);
  }

  return { fields, unmapped };
}