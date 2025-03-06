export type CleanThread = {
  threadId: string;
  userId: string;
  status: "pending" | "processing" | "completed";
  createdAt: string;
  from: string;
  subject: string;
  snippet: string;
  date: Date;

  action?: string; // TODO: remove
  archive?: boolean;
  label?: string;
};
