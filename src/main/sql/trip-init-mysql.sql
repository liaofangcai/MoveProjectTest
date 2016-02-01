/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50619
Source Host           : localhost:3306
Source Database       : decision

Target Server Type    : MYSQL
Target Server Version : 50619
File Encoding         : 65001

Date: 2015-03-24 10:32:02
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `cde_account`
-- ----------------------------
DROP TABLE IF EXISTS `cde_account`;
CREATE TABLE `cde_account` (
  `F_ID` varchar(255) NOT NULL,
  `F_ACCOUNT_NAME` varchar(30) DEFAULT NULL,
  `F_DELETED` tinyint(1) DEFAULT NULL,
  `F_DISABLED` tinyint(1) DEFAULT NULL,
  `F_EMAIL` varchar(100) DEFAULT NULL,
  `F_MOBILE` varchar(30) DEFAULT NULL,
  `F_PASSWORD` varchar(60) DEFAULT NULL,
  `F_REALNAME` varchar(30) DEFAULT NULL,
  `F_TELEPHONE` varchar(30) DEFAULT NULL,
  `F_DEPARTMENT_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_gk10g5o8p3oaw2dtg7jc71pq6` (`F_DEPARTMENT_ID`),
  CONSTRAINT `FK_gk10g5o8p3oaw2dtg7jc71pq6` FOREIGN KEY (`F_DEPARTMENT_ID`) REFERENCES `cde_department` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_account
-- ----------------------------
INSERT INTO `cde_account` VALUES ('799eb843-d9cd-460b-9c7c-5db6abacca40', 'admin', null, '0', 'admin@zyeeda.com', '', '$2a$10$QccsfJpVahfABE1r.S.k1.57nE31Bly9bS6eD.5p6PSShuEzrCwk.', '管理员', '', null);

-- ----------------------------
-- Table structure for `cde_attachment`
-- ----------------------------
DROP TABLE IF EXISTS `cde_attachment`;
CREATE TABLE `cde_attachment` (
  `F_ID` varchar(255) NOT NULL,
  `F_CONTENT_TYPE` varchar(255) DEFAULT NULL,
  `F_CREATE_TIME` datetime DEFAULT NULL,
  `F_DRAFT` tinyint(1) DEFAULT NULL,
  `F_FILENAME` varchar(255) DEFAULT NULL,
  `F_PATH` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_attachment
-- ----------------------------

-- ----------------------------
-- Table structure for `cde_department`
-- ----------------------------
DROP TABLE IF EXISTS `cde_department`;
CREATE TABLE `cde_department` (
  `F_ID` varchar(255) NOT NULL,
  `F_CODE` varchar(3000) DEFAULT NULL,
  `F_DELETED` tinyint(1) DEFAULT NULL,
  `F_NAME` varchar(30) DEFAULT NULL,
  `F_PATH` varchar(3000) DEFAULT NULL,
  `F_RANK` int(11) DEFAULT NULL,
  `F_PARENT_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_42vf1lbf0wbm1cf55nekdptqe` (`F_PARENT_ID`),
  CONSTRAINT `FK_42vf1lbf0wbm1cf55nekdptqe` FOREIGN KEY (`F_PARENT_ID`) REFERENCES `cde_department` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_department
-- ----------------------------

-- ----------------------------
-- Table structure for `cde_menuitem`
-- ----------------------------
DROP TABLE IF EXISTS `cde_menuitem`;
CREATE TABLE `cde_menuitem` (
  `F_ID` varchar(255) NOT NULL,
  `F_DESC` varchar(2000) DEFAULT NULL,
  `F_ICON` varchar(100) DEFAULT NULL,
  `F_NAME` varchar(100) DEFAULT NULL,
  `F_OPENED` tinyint(1) DEFAULT NULL,
  `F_OPTION` varchar(2000) DEFAULT NULL,
  `F_PATH` varchar(200) DEFAULT NULL,
  `F_RANK` int(11) DEFAULT NULL,
  `F_PARENT_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_h2b6b8m4xpfwhq7ywuw69lx84` (`F_PARENT_ID`),
  CONSTRAINT `FK_h2b6b8m4xpfwhq7ywuw69lx84` FOREIGN KEY (`F_PARENT_ID`) REFERENCES `cde_menuitem` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_menuitem
-- ----------------------------
INSERT INTO `cde_menuitem` VALUES ('1', '', 'icon-tasks', '待办任务', null, '', '', '1', null);
INSERT INTO `cde_menuitem` VALUES ('101', '', 'icon-double-angle-right', '我的待办', null, '', '#feature/process/scaffold:process-taskinfo', '1', '1');
INSERT INTO `cde_menuitem` VALUES ('102', '', 'icon-double-angle-right', '已办任务', null, '', '#feature/process/scaffold:approval-history', '2', '1');
INSERT INTO `cde_menuitem` VALUES ('103', '', 'icon-double-angle-right', '我的通知', null, '', '#feature/system/scaffold:my-notice', '3', '1');
INSERT INTO `cde_menuitem` VALUES ('9', null, 'icon-cogs', '系统设置', null, null, null, '9', null);
INSERT INTO `cde_menuitem` VALUES ('92', null, 'icon-key', '权限管理', null, null, '#feature/system/scaffold:permissions', '1', '9');
INSERT INTO `cde_menuitem` VALUES ('93', null, 'icon-group', '角色管理', null, null, '#feature/system/scaffold:roles', '2', '9');
INSERT INTO `cde_menuitem` VALUES ('94', null, 'icon-sitemap', '用户组织机构管理', null, null, '#feature/admin/account-department', '3', '9');
INSERT INTO `cde_menuitem` VALUES ('95', '', 'icon-double-angle-right', '流程业务定义', null, '', '#feature/process/scaffold:business-definition', '4', '9');
INSERT INTO `cde_menuitem` VALUES ('96', '', 'icon-double-angle-right', '流程定义管理', null, '', '#feature/process/scaffold:process-definition', '5', '9');

-- ----------------------------
-- Table structure for `cde_permission`
-- ----------------------------
DROP TABLE IF EXISTS `cde_permission`;
CREATE TABLE `cde_permission` (
  `F_ID` varchar(255) NOT NULL,
  `F_DESC` varchar(2000) DEFAULT NULL,
  `F_NAME` varchar(100) DEFAULT NULL,
  `F_SCAFFOLD` tinyint(1) DEFAULT NULL,
  `F_VALUE` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_permission
-- ----------------------------
INSERT INTO `cde_permission` VALUES ('089498a7-c7c8-45ed-bd4f-5037d7cc9b76', '系统流程', '删除流程定义', null, 'process/process-definition:del');
INSERT INTO `cde_permission` VALUES ('11e16323-dc95-4a6d-93b7-a26eda7ba7aa', '系统流程', '添加流程定义', null, 'process/process-definition:add');
INSERT INTO `cde_permission` VALUES ('2091c7a7-0916-4555-ac23-d88aab06fbac', '综合管理', '修改通知', null, 'system/notice:edit');
INSERT INTO `cde_permission` VALUES ('209e9f53-d368-4274-afed-6bb9f59315c1', '综合管理', '添加通知', null, 'system/notice:add');
INSERT INTO `cde_permission` VALUES ('31cc95ad-cf85-4c7c-a3b5-2c45b19ec9ed', '综合管理', '撤销通知', null, 'system/notice:revert');
INSERT INTO `cde_permission` VALUES ('3779f540-6fa7-44e4-a7a9-3a9a47311758', '综合管理', '关闭通知', null, 'system/notice:close');
INSERT INTO `cde_permission` VALUES ('3f48cf60-3234-4e7a-85fd-a3e659bb8fbb', '综合管理', '删除通知', null, 'system/notice:del');
INSERT INTO `cde_permission` VALUES ('53581281-517d-41ea-b755-ce9478355659', '系统流程', '添加流程业务定义', null, 'process/business-definition:add');
INSERT INTO `cde_permission` VALUES ('5af706af-a041-47f0-b1fe-dee4c01c2238', '系统流程', '删除流程业务定义', null, 'process/business-definition:del');
INSERT INTO `cde_permission` VALUES ('60c85a6d-eed6-4e78-8a4d-a3d4ed98808c', '系统流程', '编辑流程业务定义', null, 'process/business-definition:edit');
INSERT INTO `cde_permission` VALUES ('71cd1247-5950-4f19-adda-d7923ac32221', '系统流程', '查看已办任务', null, 'process/approval-history:show');
INSERT INTO `cde_permission` VALUES ('7c5b64ac-38d6-4a52-ae1b-228eb8a0da18', '系统流程', '审批我的待办任务', null, 'process/process-taskinfo:audit');
INSERT INTO `cde_permission` VALUES ('86d06478-8ce2-4149-9a35-05d6c154fd6b', '系统流程', '显示流程定义界面', null, 'process/process-definition:show');
INSERT INTO `cde_permission` VALUES ('8c02c9be-3537-42a9-854f-1e1b3fc3ff04', '综合管理', '发布通知', null, 'system/notice:issue');
INSERT INTO `cde_permission` VALUES ('901', '系统管理', '添加角色', null, 'system/roles:add');
INSERT INTO `cde_permission` VALUES ('902', '系统管理', '显示角色管理界面', null, 'system/roles:show');
INSERT INTO `cde_permission` VALUES ('903', '系统管理', '编辑角色', null, 'system/roles:edit');
INSERT INTO `cde_permission` VALUES ('904', '系统管理', '删除角色', null, 'system/roles:del');
INSERT INTO `cde_permission` VALUES ('911', '系统管理', '添加部门', null, 'system/departments:add');
INSERT INTO `cde_permission` VALUES ('912', '系统管理', '编辑部门', null, 'system/departments:edit');
INSERT INTO `cde_permission` VALUES ('913', '系统管理', '删除部门', null, 'system/departments:del');
INSERT INTO `cde_permission` VALUES ('914', '系统管理', '拖动部门', null, 'system/departments:toggleMove');
INSERT INTO `cde_permission` VALUES ('921', '系统管理', '添加账号', null, 'system/accounts:add');
INSERT INTO `cde_permission` VALUES ('922', '系统管理', '查看账号', null, 'system/accounts:show');
INSERT INTO `cde_permission` VALUES ('923', '系统管理', '编辑账号', null, 'system/accounts:edit');
INSERT INTO `cde_permission` VALUES ('924', '系统管理', '删除账号', null, 'system/accounts:del');
INSERT INTO `cde_permission` VALUES ('925', '系统管理', '修改账号密码', null, 'system/accounts:changePassword');
INSERT INTO `cde_permission` VALUES ('931', '系统管理', '显示用户组织机构管理界面', null, 'admin/account-department:show');
INSERT INTO `cde_permission` VALUES ('941', '系统管理', '查看部门', null, 'system/departments:show');
INSERT INTO `cde_permission` VALUES ('951', '系统管理', '显示权限管理界面', null, 'system/permissions:show');
INSERT INTO `cde_permission` VALUES ('961', '系统管理', '显示菜单', null, 'system/menu:show');
INSERT INTO `cde_permission` VALUES ('a8b3484b-344e-4a79-8a32-cc2157b5791c', '系统流程', '显示我的待办页面', null, 'process/process-taskinfo:show');
INSERT INTO `cde_permission` VALUES ('ad7f8cba-81bd-4b18-bc3d-ef6f42e6244e', '综合管理', '查看通知', null, 'system/notice:show');
INSERT INTO `cde_permission` VALUES ('bae8c0a7-fca7-4306-b47a-d8f210faf6b6', '综合管理', '查看我的通知', null, 'system/my-notice:show');
INSERT INTO `cde_permission` VALUES ('e971e4ab-4981-4c32-a643-9754291d25da', '系统流程', '显示流程业务定义界面', null, 'process/business-definition:show');
INSERT INTO `cde_permission` VALUES ('f2a3c47b-5949-4fc4-abb4-bafd284f1279', '系统流程', '编辑流程定义', null, 'process/process-definition:edit');
INSERT INTO `cde_permission` VALUES ('1201', '资讯循环>年度计划', '显示年度计划界面', null, 'informationcycle/yearsplan:show');
INSERT INTO `cde_permission` VALUES ('1202', '资讯循环>年度计划', '添加年度计划', null, 'informationcycle/yearsplan:add');
INSERT INTO `cde_permission` VALUES ('1203', '资讯循环>年度计划', '编辑年度计划', null, 'informationcycle/yearsplan:edit');
INSERT INTO `cde_permission` VALUES ('1204', '资讯循环>年度计划', '删除年度计划', null, 'informationcycle/yearsplan:del');
INSERT INTO `cde_permission` VALUES ('1205', '资讯循环>年度计划', '导出年度计划', null, 'informationcycle/yearsplan:exportExcel');
INSERT INTO `cde_permission` VALUES ('1206', '资讯循环>年度预算', '显示年度预算界面', null, 'informationcycle/yearsbudget:show');
INSERT INTO `cde_permission` VALUES ('1207', '资讯循环>年度预算', '添加年度预算', null, 'informationcycle/yearsbudget:add');
INSERT INTO `cde_permission` VALUES ('1208', '资讯循环>年度预算', '编辑年度预算', null, 'informationcycle/yearsbudget:edit');
INSERT INTO `cde_permission` VALUES ('1209', '资讯循环>年度预算', '删除年度预算', null, 'informationcycle/yearsbudget:del');
INSERT INTO `cde_permission` VALUES ('1210', '资讯循环>年度预算', '导出年度预算', null, 'informationcycle/yearsbudget:exportExcel');
INSERT INTO `cde_permission` VALUES ('1211', '资讯循环>稽核计划', '显示稽核计划界面', null, 'informationcycle/auditplan:show');
INSERT INTO `cde_permission` VALUES ('1212', '资讯循环>稽核计划', '添加年度计划', null, 'informationcycle/auditplan:add');
INSERT INTO `cde_permission` VALUES ('1213', '资讯循环>稽核计划', '编辑年度计划', null, 'informationcycle/auditplan:edit');
INSERT INTO `cde_permission` VALUES ('1214', '资讯循环>稽核计划', '删除年度计划', null, 'informationcycle/auditplan:del');
INSERT INTO `cde_permission` VALUES ('1215', '资讯循环>稽核计划', '导出年度计划', null, 'informationcycle/auditplan:exportExcel');
INSERT INTO `cde_permission` VALUES ('1216', '资讯循环>系统账号权限清查', '显示系统账号权限清查界面', null, 'informationcycle/syspermissioncheck:show');
INSERT INTO `cde_permission` VALUES ('1217', '资讯循环>系统账号权限清查', '添加系统账号权限清查', null, 'informationcycle/syspermissioncheck:add');
INSERT INTO `cde_permission` VALUES ('1218', '资讯循环>系统账号权限清查', '编辑系统账号权限清查', null, 'informationcycle/syspermissioncheck:edit');
INSERT INTO `cde_permission` VALUES ('1219', '资讯循环>系统账号权限清查', '删除系统账号权限清查', null, 'informationcycle/syspermissioncheck:del');
INSERT INTO `cde_permission` VALUES ('1220', '资讯循环>系统账号权限清查', '导出系统账号权限清查', null, 'informationcycle/syspermissioncheck:exportExcel');
INSERT INTO `cde_permission` VALUES ('1221', '资讯循环>软件安装情况清查', '显示软件安装清查界面', null, 'informationcycle/softwareinstall:show');
INSERT INTO `cde_permission` VALUES ('1222', '资讯循环>软件安装情况清查', '添加软件安装清查', null, 'informationcycle/softwareinstall:add');
INSERT INTO `cde_permission` VALUES ('1223', '资讯循环>软件安装情况清查', '编辑软件安装清查', null, 'informationcycle/softwareinstall:edit');
INSERT INTO `cde_permission` VALUES ('1224', '资讯循环>软件安装情况清查', '删除软件安装清查', null, 'informationcycle/softwareinstall:del');
INSERT INTO `cde_permission` VALUES ('1225', '资讯循环>年度计划情况清查', '导出软件安装清查', null, 'informationcycle/softwareinstall:exportExcel');



-- ----------------------------
-- Table structure for `cde_role`
-- ----------------------------
DROP TABLE IF EXISTS `cde_role`;
CREATE TABLE `cde_role` (
  `F_ID` varchar(255) NOT NULL,
  `F_DESC` varchar(2000) DEFAULT NULL,
  `F_SCAFFOLD` tinyint(1) DEFAULT NULL,
  `F_NAME` varchar(30) DEFAULT NULL,
  `F_DEPARTMENT_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_bomgp52wcxa6p5b22rpjxeugb` (`F_DEPARTMENT_ID`),
  CONSTRAINT `FK_bomgp52wcxa6p5b22rpjxeugb` FOREIGN KEY (`F_DEPARTMENT_ID`) REFERENCES `cde_department` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_role
-- ----------------------------
INSERT INTO `cde_role` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', null, null, '系统管理员', null);

-- ----------------------------
-- Table structure for `cde_role_account`
-- ----------------------------
DROP TABLE IF EXISTS `cde_role_account`;
CREATE TABLE `cde_role_account` (
  `F_ACCOUNT_ID` varchar(255) NOT NULL,
  `F_ROLE_ID` varchar(255) NOT NULL,
  PRIMARY KEY (`F_ACCOUNT_ID`,`F_ROLE_ID`),
  KEY `FK_1cwly3tmp1u1qq9nc371nth0v` (`F_ROLE_ID`),
  KEY `FK_dhb02hwgd5r5467skqq93lcui` (`F_ACCOUNT_ID`),
  CONSTRAINT `FK_1cwly3tmp1u1qq9nc371nth0v` FOREIGN KEY (`F_ROLE_ID`) REFERENCES `cde_role` (`F_ID`),
  CONSTRAINT `FK_dhb02hwgd5r5467skqq93lcui` FOREIGN KEY (`F_ACCOUNT_ID`) REFERENCES `cde_account` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_role_account
-- ----------------------------
INSERT INTO `cde_role_account` VALUES ('799eb843-d9cd-460b-9c7c-5db6abacca40', '26c49fad-dc2b-4b9a-b8fc-88324e3e0d70');

-- ----------------------------
-- Table structure for `cde_role_permission`
-- ----------------------------
DROP TABLE IF EXISTS `cde_role_permission`;
CREATE TABLE `cde_role_permission` (
  `F_ROLE_ID` varchar(255) NOT NULL,
  `F_PERMISSION_ID` varchar(255) NOT NULL,
  PRIMARY KEY (`F_ROLE_ID`,`F_PERMISSION_ID`),
  KEY `FK_huvp2upfuevk02659kj2i5mi0` (`F_PERMISSION_ID`),
  KEY `FK_ioxwdkt2i1s51j7qy5ss9te86` (`F_ROLE_ID`),
  CONSTRAINT `FK_huvp2upfuevk02659kj2i5mi0` FOREIGN KEY (`F_PERMISSION_ID`) REFERENCES `cde_permission` (`F_ID`),
  CONSTRAINT `FK_ioxwdkt2i1s51j7qy5ss9te86` FOREIGN KEY (`F_ROLE_ID`) REFERENCES `cde_role` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_role_permission
-- ----------------------------
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '089498a7-c7c8-45ed-bd4f-5037d7cc9b76');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '11e16323-dc95-4a6d-93b7-a26eda7ba7aa');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '2091c7a7-0916-4555-ac23-d88aab06fbac');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '209e9f53-d368-4274-afed-6bb9f59315c1');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '31cc95ad-cf85-4c7c-a3b5-2c45b19ec9ed');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '3779f540-6fa7-44e4-a7a9-3a9a47311758');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '3f48cf60-3234-4e7a-85fd-a3e659bb8fbb');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '53581281-517d-41ea-b755-ce9478355659');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '5af706af-a041-47f0-b1fe-dee4c01c2238');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '60c85a6d-eed6-4e78-8a4d-a3d4ed98808c');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '71cd1247-5950-4f19-adda-d7923ac32221');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '7c5b64ac-38d6-4a52-ae1b-228eb8a0da18');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '86d06478-8ce2-4149-9a35-05d6c154fd6b');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8c02c9be-3537-42a9-854f-1e1b3fc3ff04');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '901');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '902');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '903');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '904');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '911');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '912');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '913');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '914');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '921');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '922');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '923');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '924');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '925');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '931');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '941');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '951');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '961');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', 'a8b3484b-344e-4a79-8a32-cc2157b5791c');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', 'ad7f8cba-81bd-4b18-bc3d-ef6f42e6244e');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', 'bae8c0a7-fca7-4306-b47a-d8f210faf6b6');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', 'e971e4ab-4981-4c32-a643-9754291d25da');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', 'f2a3c47b-5949-4fc4-abb4-bafd284f1279');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1201');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1202');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1203');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1204');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1205');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1206');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1207');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1208');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1209');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1210');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1211');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1212');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1213');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1214');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1215');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1216');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1217');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1218');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1219');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1220');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1221');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1222');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1223');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1224');
INSERT INTO `cde_role_permission` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '1225');
-- ----------------------------
-- Table structure for `cde_settingitem`
-- ----------------------------
DROP TABLE IF EXISTS `cde_settingitem`;
CREATE TABLE `cde_settingitem` (
  `F_ID` varchar(255) NOT NULL,
  `F_DESC` varchar(2000) DEFAULT NULL,
  `F_NAME` varchar(200) DEFAULT NULL,
  `F_VALUE` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cde_settingitem
-- ----------------------------

-- ----------------------------
-- Table structure for `me_system_account_extension`
-- ----------------------------
DROP TABLE IF EXISTS `me_system_account_extension`;
CREATE TABLE `me_system_account_extension` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATE_DEPT_PATH` varchar(3000) DEFAULT NULL,
  `F_DATA_LEVEL` int(11) DEFAULT NULL,
  `F_ACCOUNT_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_r6fynkh09uq79828ejk80s0kb` (`F_ACCOUNT_ID`),
  CONSTRAINT `FK_r6fynkh09uq79828ejk80s0kb` FOREIGN KEY (`F_ACCOUNT_ID`) REFERENCES `cde_account` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of me_system_account_extension
-- ----------------------------
INSERT INTO `me_system_account_extension` VALUES ('297e9cdf4c458b3d014c458d54450000', null, '1', '799eb843-d9cd-460b-9c7c-5db6abacca40');

-- ----------------------------
-- Table structure for `zda_my_notice`
-- ----------------------------
DROP TABLE IF EXISTS `zda_my_notice`;
CREATE TABLE `zda_my_notice` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATED_TIME` datetime DEFAULT NULL,
  `F_CREATOR` varchar(50) DEFAULT NULL,
  `F_CREATOR_NAME` varchar(30) DEFAULT NULL,
  `F_LAST_MODIFIED_TIME` datetime DEFAULT NULL,
  `F_LAST_MODIFIER` varchar(50) DEFAULT NULL,
  `F_LAST_MODIFIER_NAME` varchar(30) DEFAULT NULL,
  `F_CONTENT` varchar(4000) DEFAULT NULL,
  `F_ISSUE_TIME` datetime DEFAULT NULL,
  `F_SIGN` tinyint(1) DEFAULT NULL,
  `F_TITLE` varchar(500) DEFAULT NULL,
  `F_ATTACHMENT_ID` varchar(255) DEFAULT NULL,
  `F_ISSUE_ACCOUNT_ID` varchar(255) DEFAULT NULL,
  `F_RECEIVE_ACCOUNT_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_qgx79w826w65knxkruu0limyt` (`F_ATTACHMENT_ID`),
  KEY `FK_tax3lfu1xtxinm3solkdwmw2b` (`F_ISSUE_ACCOUNT_ID`),
  KEY `FK_ibxx8823pa045icpbrus774lf` (`F_RECEIVE_ACCOUNT_ID`),
  CONSTRAINT `FK_ibxx8823pa045icpbrus774lf` FOREIGN KEY (`F_RECEIVE_ACCOUNT_ID`) REFERENCES `cde_account` (`F_ID`),
  CONSTRAINT `FK_qgx79w826w65knxkruu0limyt` FOREIGN KEY (`F_ATTACHMENT_ID`) REFERENCES `cde_attachment` (`F_ID`),
  CONSTRAINT `FK_tax3lfu1xtxinm3solkdwmw2b` FOREIGN KEY (`F_ISSUE_ACCOUNT_ID`) REFERENCES `cde_account` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_my_notice
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_notice`
-- ----------------------------
DROP TABLE IF EXISTS `zda_notice`;
CREATE TABLE `zda_notice` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATED_TIME` datetime DEFAULT NULL,
  `F_CREATOR` varchar(50) DEFAULT NULL,
  `F_CREATOR_NAME` varchar(30) DEFAULT NULL,
  `F_LAST_MODIFIED_TIME` datetime DEFAULT NULL,
  `F_LAST_MODIFIER` varchar(50) DEFAULT NULL,
  `F_LAST_MODIFIER_NAME` varchar(30) DEFAULT NULL,
  `F_CREATE_DEPT_PATH` varchar(3000) DEFAULT NULL,
  `F_CONTENT` varchar(4000) DEFAULT NULL,
  `F_CREATE_TIME` date DEFAULT NULL,
  `F_EXTEND_FILED1` varchar(500) DEFAULT NULL,
  `F_EXTEND_FILED2` varchar(500) DEFAULT NULL,
  `F_EXTEND_FILED3` varchar(500) DEFAULT NULL,
  `F_ISSUE_TIME` date DEFAULT NULL,
  `F_METHOD_PATH` varchar(500) DEFAULT NULL,
  `F_SIGN` tinyint(1) DEFAULT NULL,
  `F_STATUS` varchar(500) DEFAULT NULL,
  `F_TITLE` varchar(500) DEFAULT NULL,
  `F_TTACHMENT_ID` varchar(255) DEFAULT NULL,
  `F_ISSUE_ACCOUNT_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_970uch13k7rbum0ildi60122f` (`F_TTACHMENT_ID`),
  KEY `FK_1qq9i72r244n5a06u5hxc4ei2` (`F_ISSUE_ACCOUNT_ID`),
  CONSTRAINT `FK_1qq9i72r244n5a06u5hxc4ei2` FOREIGN KEY (`F_ISSUE_ACCOUNT_ID`) REFERENCES `cde_account` (`F_ID`),
  CONSTRAINT `FK_970uch13k7rbum0ildi60122f` FOREIGN KEY (`F_TTACHMENT_ID`) REFERENCES `cde_attachment` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_notice
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_notice_account`
-- ----------------------------
DROP TABLE IF EXISTS `zda_notice_account`;
CREATE TABLE `zda_notice_account` (
  `F_NOTICE_ID` varchar(255) NOT NULL,
  `F_ACCOUNT_ID` varchar(255) NOT NULL,
  KEY `FK_aannbivh79p28d1mf293xc2xk` (`F_ACCOUNT_ID`),
  KEY `FK_aygcg3x3tf7p5l9mc6a5mn08q` (`F_NOTICE_ID`),
  CONSTRAINT `FK_aannbivh79p28d1mf293xc2xk` FOREIGN KEY (`F_ACCOUNT_ID`) REFERENCES `cde_account` (`F_ID`),
  CONSTRAINT `FK_aygcg3x3tf7p5l9mc6a5mn08q` FOREIGN KEY (`F_NOTICE_ID`) REFERENCES `zda_notice` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_notice_account
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_notice_department`
-- ----------------------------
DROP TABLE IF EXISTS `zda_notice_department`;
CREATE TABLE `zda_notice_department` (
  `F_NOTICE_ID` varchar(255) NOT NULL,
  `F_DEPARTMENT_ID` varchar(255) NOT NULL,
  KEY `FK_dgx6357tc9hpkql72qjdul2nl` (`F_DEPARTMENT_ID`),
  KEY `FK_layn0rhmo6ybsu2lmo0x2nrmd` (`F_NOTICE_ID`),
  CONSTRAINT `FK_dgx6357tc9hpkql72qjdul2nl` FOREIGN KEY (`F_DEPARTMENT_ID`) REFERENCES `cde_department` (`F_ID`),
  CONSTRAINT `FK_layn0rhmo6ybsu2lmo0x2nrmd` FOREIGN KEY (`F_NOTICE_ID`) REFERENCES `zda_notice` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_notice_department
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_notice_role`
-- ----------------------------
DROP TABLE IF EXISTS `zda_notice_role`;
CREATE TABLE `zda_notice_role` (
  `F_NOTICE_ID` varchar(255) NOT NULL,
  `F_ROLE_ID` varchar(255) NOT NULL,
  KEY `FK_b49f24ty6tdqwya5g4gx5f2x3` (`F_ROLE_ID`),
  KEY `FK_1fr7bw7o0m51haiq2qyd9rnt6` (`F_NOTICE_ID`),
  CONSTRAINT `FK_1fr7bw7o0m51haiq2qyd9rnt6` FOREIGN KEY (`F_NOTICE_ID`) REFERENCES `zda_notice` (`F_ID`),
  CONSTRAINT `FK_b49f24ty6tdqwya5g4gx5f2x3` FOREIGN KEY (`F_ROLE_ID`) REFERENCES `cde_role` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_notice_role
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_approval_history`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_approval_history`;
CREATE TABLE `zda_process_approval_history` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATE_DEPT_PATH` varchar(3000) DEFAULT NULL,
  `F_COMMENT` varchar(500) DEFAULT NULL,
  `F_IS_SEND_PROCESS` tinyint(1) DEFAULT NULL,
  `F_OPERATE_TIME` datetime DEFAULT NULL,
  `F_ENTRY_ID` varchar(500) DEFAULT NULL,
  `F_SUGGESTION` varchar(4000) DEFAULT NULL,
  `F_TASK_DESC` varchar(500) DEFAULT NULL,
  `F_BUSINESS_DEFINITION_ID` varchar(255) DEFAULT NULL,
  `F_OPERATOR_USER_ID` varchar(255) DEFAULT NULL,
  `F_PROCESS_TASK_INFO_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_31q5xbx5sacwo8bt1t2lvjuo0` (`F_BUSINESS_DEFINITION_ID`),
  KEY `FK_i93bgkc32pm4xajh2u67jra34` (`F_OPERATOR_USER_ID`),
  KEY `FK_66d4rjjt3e39w2s9cq2tqqb6x` (`F_PROCESS_TASK_INFO_ID`),
  CONSTRAINT `FK_31q5xbx5sacwo8bt1t2lvjuo0` FOREIGN KEY (`F_BUSINESS_DEFINITION_ID`) REFERENCES `zda_process_busi_definition` (`F_ID`),
  CONSTRAINT `FK_66d4rjjt3e39w2s9cq2tqqb6x` FOREIGN KEY (`F_PROCESS_TASK_INFO_ID`) REFERENCES `zda_process_task_info` (`F_ID`),
  CONSTRAINT `FK_i93bgkc32pm4xajh2u67jra34` FOREIGN KEY (`F_OPERATOR_USER_ID`) REFERENCES `cde_account` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_approval_history
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_busi_definition`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_busi_definition`;
CREATE TABLE `zda_process_busi_definition` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATED_TIME` datetime DEFAULT NULL,
  `F_CREATOR` varchar(50) DEFAULT NULL,
  `F_CREATOR_NAME` varchar(30) DEFAULT NULL,
  `F_LAST_MODIFIED_TIME` datetime DEFAULT NULL,
  `F_LAST_MODIFIER` varchar(50) DEFAULT NULL,
  `F_LAST_MODIFIER_NAME` varchar(30) DEFAULT NULL,
  `F_CREATE_DEPT_PATH` varchar(3000) DEFAULT NULL,
  `F_BUSINESS_FEATURE_PATH` varchar(500) DEFAULT NULL,
  `F_BUSINESS_MARK` varchar(500) DEFAULT NULL,
  `F_BUSINESS_NAME` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_busi_definition
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_definition`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_definition`;
CREATE TABLE `zda_process_definition` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATED_TIME` datetime DEFAULT NULL,
  `F_CREATOR` varchar(50) DEFAULT NULL,
  `F_CREATOR_NAME` varchar(30) DEFAULT NULL,
  `F_LAST_MODIFIED_TIME` datetime DEFAULT NULL,
  `F_LAST_MODIFIER` varchar(50) DEFAULT NULL,
  `F_LAST_MODIFIER_NAME` varchar(30) DEFAULT NULL,
  `F_CREATE_DEPT_PATH` varchar(3000) DEFAULT NULL,
  `F_END_STATUSES` varchar(500) DEFAULT NULL,
  `F_BUSINESS_DEFINITION_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_br0dpmltsw1odp86ub9bfta2t` (`F_BUSINESS_DEFINITION_ID`),
  CONSTRAINT `FK_br0dpmltsw1odp86ub9bfta2t` FOREIGN KEY (`F_BUSINESS_DEFINITION_ID`) REFERENCES `zda_process_busi_definition` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_definition
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_instance`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_instance`;
CREATE TABLE `zda_process_instance` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATE_DEPT_PATH` varchar(3000) DEFAULT NULL,
  `F_FINISH_TIME` datetime DEFAULT NULL,
  `F_IS_FINISHED` tinyint(1) DEFAULT NULL,
  `F_IS_SIGN` tinyint(1) DEFAULT NULL,
  `F_ENTRY_ID` varchar(500) DEFAULT NULL,
  `F_SUBMIT_TIME` datetime DEFAULT NULL,
  `F_FINISHOR_USER_ID` varchar(255) DEFAULT NULL,
  `F_PROCESS_DEFINITION_ID` varchar(255) DEFAULT NULL,
  `F_SUBMITTER_USER_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_5yt3ldv6qb5133d5wt4sdkn25` (`F_FINISHOR_USER_ID`),
  KEY `FK_14cf238a31cc3wjygr0mg45l2` (`F_PROCESS_DEFINITION_ID`),
  KEY `FK_fu0sekrwb4yai54d7v4xdlyem` (`F_SUBMITTER_USER_ID`),
  CONSTRAINT `FK_14cf238a31cc3wjygr0mg45l2` FOREIGN KEY (`F_PROCESS_DEFINITION_ID`) REFERENCES `zda_process_definition` (`F_ID`),
  CONSTRAINT `FK_5yt3ldv6qb5133d5wt4sdkn25` FOREIGN KEY (`F_FINISHOR_USER_ID`) REFERENCES `cde_account` (`F_ID`),
  CONSTRAINT `FK_fu0sekrwb4yai54d7v4xdlyem` FOREIGN KEY (`F_SUBMITTER_USER_ID`) REFERENCES `cde_account` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_instance
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_set_account`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_set_account`;
CREATE TABLE `zda_process_set_account` (
  `F_SETTINGITEM_ID` varchar(255) NOT NULL,
  `F_ACCOUNT_ID` varchar(255) NOT NULL,
  KEY `FK_apqrmr41flcx361nad4v023yp` (`F_ACCOUNT_ID`),
  KEY `FK_i9x7b1c7wv068ymopnq5ydtgv` (`F_SETTINGITEM_ID`),
  CONSTRAINT `FK_apqrmr41flcx361nad4v023yp` FOREIGN KEY (`F_ACCOUNT_ID`) REFERENCES `cde_account` (`F_ID`),
  CONSTRAINT `FK_i9x7b1c7wv068ymopnq5ydtgv` FOREIGN KEY (`F_SETTINGITEM_ID`) REFERENCES `zda_process_settingitem` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_set_account
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_set_department`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_set_department`;
CREATE TABLE `zda_process_set_department` (
  `F_SETTINGITEM_ID` varchar(255) NOT NULL,
  `F_DEPARTMENT_ID` varchar(255) NOT NULL,
  KEY `FK_kqtg4khc73hpbd89k9suouftc` (`F_DEPARTMENT_ID`),
  KEY `FK_uyb02ktlfnbws7npc3f62pom` (`F_SETTINGITEM_ID`),
  CONSTRAINT `FK_kqtg4khc73hpbd89k9suouftc` FOREIGN KEY (`F_DEPARTMENT_ID`) REFERENCES `cde_department` (`F_ID`),
  CONSTRAINT `FK_uyb02ktlfnbws7npc3f62pom` FOREIGN KEY (`F_SETTINGITEM_ID`) REFERENCES `zda_process_settingitem` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_set_department
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_set_role`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_set_role`;
CREATE TABLE `zda_process_set_role` (
  `F_SETTINGITEM_ID` varchar(255) NOT NULL,
  `F_ROLE_ID` varchar(255) NOT NULL,
  KEY `FK_qpb57m41au887qnn35td3didu` (`F_ROLE_ID`),
  KEY `FK_awmt0n6s13jpkwcpmoccom2cj` (`F_SETTINGITEM_ID`),
  CONSTRAINT `FK_awmt0n6s13jpkwcpmoccom2cj` FOREIGN KEY (`F_SETTINGITEM_ID`) REFERENCES `zda_process_settingitem` (`F_ID`),
  CONSTRAINT `FK_qpb57m41au887qnn35td3didu` FOREIGN KEY (`F_ROLE_ID`) REFERENCES `cde_role` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_set_role
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_settingitem`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_settingitem`;
CREATE TABLE `zda_process_settingitem` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATE_DEPT_PATH` varchar(3000) DEFAULT NULL,
  `F_FLOW_STATUS` varchar(500) DEFAULT NULL,
  `F_FLOW_STATUS_DESC` varchar(500) DEFAULT NULL,
  `F_PROCESS_DEFINITION_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `FK_nhg84s8mw85psdmq0pu3wb6gk` (`F_PROCESS_DEFINITION_ID`),
  CONSTRAINT `FK_nhg84s8mw85psdmq0pu3wb6gk` FOREIGN KEY (`F_PROCESS_DEFINITION_ID`) REFERENCES `zda_process_definition` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_settingitem
-- ----------------------------

-- ----------------------------
-- Table structure for `zda_process_task_info`
-- ----------------------------
DROP TABLE IF EXISTS `zda_process_task_info`;
CREATE TABLE `zda_process_task_info` (
  `F_ID` varchar(255) NOT NULL,
  `F_CREATE_DEPT_PATH` longtext,
  `F_APPROVAL_TIME` datetime DEFAULT NULL,
  `F_COMMENT` varchar(500) DEFAULT NULL,
  `F_CREATE_TIME` datetime DEFAULT NULL,
  `F_EXTEND_FIELD_1` longtext,
  `F_EXTEND_FIELD_2` longtext,
  `F_EXTEND_FIELD_3` longtext,
  `F_FLOW_STATUS` varchar(500) DEFAULT NULL,
  `F_FLOW_STATUS_DESC` varchar(500) DEFAULT NULL,
  `F_IS_APPROVAL` int(11) DEFAULT NULL,
  `F_IS_SIGN` int(11) DEFAULT NULL,
  `F_REQUEST_NO` varchar(500) DEFAULT NULL,
  `F_SIGN_TIME` datetime DEFAULT NULL,
  `F_SUGGESTION` longtext,
  `F_APPROVALOR_USER_ID` varchar(255) DEFAULT NULL,
  `F_CREATE_USER_ID` varchar(255) DEFAULT NULL,
  `F_PROCESS_INSTANCE_ID` varchar(255) DEFAULT NULL,
  `F_PROCESS_SETTINGITEM_ID` varchar(255) DEFAULT NULL,
  `F_SIGNOR_USER_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`F_ID`),
  KEY `F_APPROVALOR_USER_ID` (`F_APPROVALOR_USER_ID`),
  KEY `F_SIGNOR_USER_ID` (`F_SIGNOR_USER_ID`),
  KEY `F_PROCESS_SETTINGITEM_ID` (`F_PROCESS_SETTINGITEM_ID`),
  KEY `F_PROCESS_INSTANCE_ID` (`F_PROCESS_INSTANCE_ID`),
  KEY `F_CREATE_USER_ID` (`F_CREATE_USER_ID`),
  CONSTRAINT `zda_process_task_info_ibfk_1` FOREIGN KEY (`F_APPROVALOR_USER_ID`) REFERENCES `cde_account` (`F_ID`),
  CONSTRAINT `zda_process_task_info_ibfk_2` FOREIGN KEY (`F_SIGNOR_USER_ID`) REFERENCES `cde_account` (`F_ID`),
  CONSTRAINT `zda_process_task_info_ibfk_3` FOREIGN KEY (`F_PROCESS_SETTINGITEM_ID`) REFERENCES `zda_process_settingitem` (`F_ID`),
  CONSTRAINT `zda_process_task_info_ibfk_4` FOREIGN KEY (`F_PROCESS_INSTANCE_ID`) REFERENCES `zda_process_instance` (`F_ID`),
  CONSTRAINT `zda_process_task_info_ibfk_5` FOREIGN KEY (`F_CREATE_USER_ID`) REFERENCES `cde_account` (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zda_process_task_info
-- ----------------------------
