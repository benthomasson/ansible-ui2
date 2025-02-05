/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Config {
  time_zone: string;
  license_info: {
    license_type: string;
    valid_key: boolean;
    subscription_name: string;
    product_name: string;
  };
  version: string;
  eula: string;
  analytics_status: string;
  analytics_collectors: {
    config: {
      name: string;
      version: string;
      description: string;
    };
    counts: {
      name: string;
      version: string;
      description: string;
    };
    cred_type_counts: {
      name: string;
      version: string;
      description: string;
    };
    events_table: {
      name: string;
      version: string;
      description: string;
    };
    instance_info: {
      name: string;
      version: string;
      description: string;
    };
    inventory_counts: {
      name: string;
      version: string;
      description: string;
    };
    org_counts: {
      name: string;
      version: string;
      description: string;
    };
    projects_by_scm_type: {
      name: string;
      version: string;
      description: string;
    };
    query_info: {
      name: string;
      version: string;
      description: string;
    };
    unified_job_template_table: {
      name: string;
      version: string;
      description: string;
    };
    unified_jobs_table: {
      name: string;
      version: string;
      description: string;
    };
    workflow_job_node_table: {
      name: string;
      version: string;
      description: string;
    };
    workflow_job_template_node_table: {
      name: string;
      version: string;
      description: string;
    };
  };
  become_methods: string[][];
  project_base_dir: string;
  project_local_paths: unknown[];
  custom_virtualenvs: unknown[];
}
