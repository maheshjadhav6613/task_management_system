export interface Task {
  title: string;
  project: string;
  priority: string;
  assignTo: string;
  dueDate: string;
  estimateTime: number;
  tags: string[];
  attachments: string[];  // Change from string to string[]
  description: string;
  status: string;
}
