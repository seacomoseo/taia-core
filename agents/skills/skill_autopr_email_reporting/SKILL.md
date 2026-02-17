---
name: autopr-email-reporting
description: Prepare autonomous PR workflow requirements with quality gates, auto-merge policy, and client-facing email report format.
---

# AutoPR Email Reporting

Define the operational contract for autonomous changes from chat request to merged PR and stakeholder notification.

## When to Use

- Designing or hardening autonomous website-edit workflows.
- Standardizing reports for client updates.

## Inputs

1. CI checks and branch protection setup.
2. Change request workflow and ownership.

## Process

1. Define mandatory checks for PR eligibility.
2. Define auto-merge policy and guardrails.
3. Define email report template with business and technical summary.
4. Define failure and rollback communication flow.

## Outputs

1. `/_context/ops/autopr-policy.md`
2. `/_context/ops/email-report-template.md`
3. `/_context/ops/autopr-runbook.md`

## Definition of Done

- [ ] Auto-merge requirements are explicit and enforceable.
- [ ] Email report includes business impact, changed files, and verification status.
- [ ] Failure paths and escalation are documented.
