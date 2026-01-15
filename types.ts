
export enum UserRole {
  ADMIN = '超级管理员',
  REGION_MANAGER = '大区经理',
  INSPECTOR = '巡检员',
  STORE_MANAGER = '店长'
}

export interface FeaturePermission {
  key: string;
  name: string;
  description: string;
  icon: string;
}

export interface LoginLog {
  id: string;
  time: string;
  ip: string;
  device: string;
  location: string;
  status: 'success' | 'failed';
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  region: string;
  avatar: string;
  lastLogin?: string;
  status?: 'active' | 'disabled';
  password?: string;
  permissions: string[];
  assigned_stores: string[]; // 负责管辖的门店 UUID 列表
  loginHistory?: LoginLog[];
}

export interface Store {
  id: string;
  code: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  last_score: number;
  manager_id?: string; // 外键：关联 profiles.id
  manager?: {
    name: string;
    avatar: string;
  };
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
}

/**
 * Added missing InspectionRecord interface
 */
export interface InspectionRecord {
  id: string;
  storeId: string;
  storeName: string;
  inspectorName: string;
  date: string;
  score: number;
  status: 'passed' | 'rectifying';
  attachments: string[];
}

/**
 * Added missing GlobalAuditLog interface
 */
export interface GlobalAuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'danger';
}

/**
 * Added missing SystemHealth interface
 */
export interface SystemHealth {
  cpu: number;
  memory: number;
  apiLatency: number;
  dbStatus: 'healthy' | 'unhealthy';
  activeSessions: number;
}
