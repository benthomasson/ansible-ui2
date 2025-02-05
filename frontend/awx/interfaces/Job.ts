/* eslint-disable @typescript-eslint/ban-types */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import { JobDetail as SwaggerJobDetail } from './generated-from-swagger/api';
import { SummaryFieldsUnifiedJob } from './summary-fields/summary-fields';

export interface Job
  extends Omit<
    SwaggerJobDetail,
    | 'name'
    | 'type'
    | 'id'
    | 'related'
    | 'summary_fields'
    | 'launched_by'
    | 'playbook_counts'
    | 'host_status_counts'
  > {
  name: string;
  id: number;
  type: string;
  summary_fields: SummaryFieldsUnifiedJob;
  related: {
    created_by?: string;
    labels?: string;
    inventory?: string;
    project?: string;
    organization?: string;
    credentials?: string;
    unified_job_template?: string;
    stdout?: string;
    execution_environment?: string;
    job_events?: string;
    job_host_summaries?: string;
    activity_stream?: string;
    notifications: string;
    create_schedule?: string;
    job_template?: string;
    cancel: string;
    project_update?: string;
    relaunch?: string;
    scm_inventory_updates?: string;
    events?: string;
    modified_by?: string;
    workflow_job_template?: string;
    workflow_nodes?: string;
    source_workflow_job?: string;
    schedule?: string;
    system_job_template?: string;
  };
  launched_by: {
    id: number;
    name: string;
    type: string;
    url: string;
  };
  playbook_counts: {
    play_count: number;
    task_count: number;
  };
  host_status_counts: {
    ok: number;
    failures: number;
  };
}
