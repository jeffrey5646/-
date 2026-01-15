
import { UserRole, User, Store, InspectionRecord, Task, FeaturePermission, LoginLog, GlobalAuditLog, SystemHealth } from './types.ts';

export const APP_FEATURES: FeaturePermission[] = [
  { key: 'inspection_field', name: '现场巡店', description: '执行标准的到店巡检流程', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { key: 'inspection_self', name: '门店自检', description: '店长发起的每日合规自查', icon: 'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 18a10.003 10.003 0 01-8.303-4.43m4.853-4.57L5.352 13m0 0l-2.251 2.251M5.352 13l2.251 2.251' },
  { key: 'task_center', name: '任务管理', description: '整改任务分配、追踪与验收', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'analytics_deep', name: '深度分析', description: '查看门店多维能力模型雷达图', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' },
  { key: 'knowledge_base', name: '知识库', description: '浏览标准作业程序与培训文档', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { key: 'exam_center', name: '考试中心', description: '在线考核、自动阅卷与积分', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const generateMockLogs = (): LoginLog[] => [
  { id: 'l1', time: '2023-11-20 09:45:12', ip: '192.168.1.102', device: 'iOS - iPhone 15 Pro', location: '上海市徐汇区', status: 'success' },
  { id: 'l2', time: '2023-11-19 14:22:05', ip: '112.65.18.92', device: 'Windows 11 - Chrome', location: '上海市浦东新区', status: 'success' },
  { id: 'l3', time: '2023-11-19 14:20:11', ip: '112.65.18.92', device: 'Windows 11 - Edge', location: '上海市浦东新区', status: 'failed' },
  { id: 'l4', time: '2023-11-18 10:15:33', ip: '180.173.22.41', device: 'Android - Xiaomi 13', location: '杭州市西湖区', status: 'success' },
];

export const SYSTEM_HEALTH: SystemHealth = {
  cpu: 18,
  memory: 42,
  apiLatency: 24,
  dbStatus: 'healthy',
  activeSessions: 1242
};

export const GLOBAL_AUDIT_LOGS: GlobalAuditLog[] = [
  { id: 'log-1', user: 'admin_chen', action: 'MOD_USER_PERM', target: 'inspector_zhou', timestamp: '2023-11-20 10:30:15', severity: 'warning' },
  { id: 'log-2', user: 'system', action: 'AUTO_BACKUP', target: 'PostgreSQL_Main', timestamp: '2023-11-20 04:00:00', severity: 'info' },
  { id: 'log-3', user: 'store_lina', action: 'SUBMIT_INSPECTION', target: 'Concept_Store_01', timestamp: '2023-11-20 09:15:22', severity: 'info' },
  { id: 'log-4', user: 'admin_chen', action: 'FORCE_LOGOUT', target: 'store_zhang', timestamp: '2023-11-19 23:45:00', severity: 'danger' },
];

export const MOCK_USER: User = {
  id: 'u-001',
  name: '陈铭',
  username: 'admin',
  role: UserRole.ADMIN,
  region: '华东大区',
  avatar: 'https://picsum.photos/id/64/100/100',
  lastLogin: '2023-11-20 09:45',
  status: 'active',
  password: 'password123',
  permissions: APP_FEATURES.map(f => f.key),
  assigned_stores: [],
  loginHistory: generateMockLogs()
};

export const MOCK_USERS: User[] = [
  { ...MOCK_USER },
  { id: 'u-002', name: '周杰', username: 'inspector_zhou', role: UserRole.INSPECTOR, region: '上海区域', avatar: 'https://picsum.photos/id/65/100/100', lastLogin: '2023-11-19 14:20', status: 'active', password: 'password123', permissions: ['inspection_field', 'task_center', 'knowledge_base'], assigned_stores: [], loginHistory: generateMockLogs() },
  { id: 'u-003', name: '李娜', username: 'store_lina', role: UserRole.STORE_MANAGER, region: '上海徐家汇', avatar: 'https://picsum.photos/id/66/100/100', lastLogin: '2023-11-20 10:05', status: 'active', password: 'password123', permissions: ['inspection_self', 'task_center', 'knowledge_base', 'exam_center'], assigned_stores: [], loginHistory: generateMockLogs() },
  { id: 'u-004', name: '刘勇', username: 'inspector_liu', role: UserRole.INSPECTOR, region: '杭州区域', avatar: 'https://picsum.photos/id/67/100/100', lastLogin: '2023-11-18 08:30', status: 'active', password: 'password123', permissions: ['inspection_field', 'analytics_deep'], assigned_stores: [], loginHistory: generateMockLogs() },
  { id: 'u-005', name: '张伟', username: 'store_zhang', role: UserRole.STORE_MANAGER, region: '上海南京路', avatar: 'https://picsum.photos/id/68/100/100', lastLogin: '2023-11-20 09:00', status: 'disabled', password: 'password123', permissions: [], assigned_stores: [], loginHistory: [] },
];

export const MOCK_STORES: Store[] = [
  { id: 's-101', code: 'N01-001', name: '上海南京路旗舰店', manager: { name: '张伟', avatar: 'https://picsum.photos/id/68/100/100' }, status: 'online', last_score: 94.5 },
  { id: 's-102', code: 'N01-002', name: '上海徐家汇概念店', manager: { name: '李娜', avatar: 'https://picsum.photos/id/66/100/100' }, status: 'warning', last_score: 78.0 },
  { id: 's-103', code: 'N01-003', name: '杭州湖滨银泰店', manager: { name: '王强', avatar: 'https://picsum.photos/id/69/100/100' }, status: 'online', last_score: 91.2 },
  { id: 's-104', code: 'N01-004', name: '苏州观前街分店', manager: undefined, status: 'offline', last_score: 0 },
];

export const MOCK_INSPECTIONS: InspectionRecord[] = [
  { id: 'i-990', storeId: 's-101', storeName: '上海南京路旗舰店', inspectorName: '周杰', date: '2023-11-19', score: 96, status: 'passed', attachments: [] },
  { id: 'i-991', storeId: 's-102', storeName: '上海徐家汇概念店', inspectorName: '周杰', date: '2023-11-18', score: 77, status: 'rectifying', attachments: [] },
  { id: 'i-992', storeId: 's-103', storeName: '杭州湖滨银泰店', inspectorName: '刘勇', date: '2023-11-17', score: 91, status: 'passed', attachments: [] },
];

export const MOCK_TASKS: Task[] = [
  { id: 't-01', title: '徐家汇店生鲜柜温控整改', assignee: '李娜', dueDate: '2023-11-22', priority: 'high', status: 'in_progress' },
  { id: 't-02', title: '年度消防安全大检查', assignee: '全体店长', dueDate: '2023-11-30', priority: 'medium', status: 'pending' },
  { id: 't-03', title: 'Q4 季度物料盘点', assignee: '陈铭', dueDate: '2023-11-25', priority: 'low', status: 'completed' },
];
