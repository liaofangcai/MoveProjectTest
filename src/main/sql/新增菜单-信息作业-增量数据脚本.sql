/*
 Navicat MySQL Data Transfer

 Source Server         : my'MySQL
 Source Server Version : 50709
 Source Host           : localhost
 Source Database       : anlmis

 Target Server Version : 50709
 File Encoding         : utf-8

 Date: 12/21/2015 11:20:39 AM
*/

BEGIN;
INSERT INTO `cde_menuitem` VALUES  ('10', null, 'icon-star', '信息作业', null, null, null, '10', null), ('1102', null, 'icon-double-angle-right', '机房工作日志', null, null, '#feature/Informationwork/scaffold:engineroom-log', '14', '10'), ('1103', null, 'icon-double-angle-right', '系统更新日志', null, null, '#feature/Informationwork/scaffold:systemUpdateRecords', '15', '10'), ('1104', null, 'icon-double-angle-right', '验收单', null, null, '#feature/Informationwork/scaffold:receivingNote', '16', '10'), ('1105', null, 'icon-double-angle-right', '自动批次作业', null, null, '#feature/Informationwork/scaffold:automaticBatchOperation', '17', '10'), ('1106', null, 'icon-double-angle-right', '机房进出记录表', null, null, '#feature/Informationwork/scaffold:roomRegistration', '18', '10'), ('1107', null, 'icon-double-angle-right', '系统备份计划', null, null, '#feature/Informationwork/scaffold:planBackup', '19', '10'), ('1108', null, 'icon-double-angle-right', '系统主机更新申请', null, null, '#feature/Informationwork/scaffold:systemRenewalApplication', '20', '10'), ('1109', null, 'icon-double-angle-right', '系统备份记录', null, null, '#feature/Informationwork/scaffold:systemBackupRecord', '21', '10'), ('1110', null, 'icon-double-angle-right', '系统数据转换计划', null, null, '#feature/Informationwork/scaffold:systemDataConversionClan', '22', '10'), ('1111', null, 'icon-double-angle', '系统数据转换申请', null, null, '#feature/Informationwork/scaffold:dataConversionApplication', '23', '10');

IINSERT INTO `cde_permission` VALUES
('8a8182fb51a4bc7a0151a4bf0f070000', '信息作业', '查看系统更新日志', null, 'Informationwork/systemUpdateRecords:show'), ('8a8182fb51a4bc7a0151a4c0cc520001', '信息作业', '添加系统更新记录', null, 'Informationwork/systemUpdateRecords:add'), ('8a8182fb51a4bc7a0151a4c15bab0002', '信息作业', '编辑系统更新记录', null, 'Informationwork/systemUpdateRecords:edit'), ('8a8182fb51a4bc7a0151a4c1be5f0003', '信息记录', '删除系统更新记录', null, 'Informationwork/systemUpdateRecords:del'), ('8a8182fb51a4bc7a0151a4c280a20004', '信息记录', '导出系统更新记录', null, 'Informationwork/systemUpdateRecords:exportExcel'), ('8a8182fb51a893330151a8993d2a0000', '信息作业', '查看验收单', null, 'Informationwork/receivingNote:show'), ('8a8182fb51a893330151a899929e0001', '信息作业', '添加验收单', null, 'Informationwork/receivingNote:add'), ('8a8182fb51a893330151a89a1ce70002', '信息作业', '删除验收单', null, 'Informationwork/receivingNote:del'), ('8a8182fb51a893330151a89a83910003', '信息作业', '编辑验收单', null, 'Informationwork/receivingNote:edit'), ('8a8182fb51a893330151a89b2ab80004', '信息作业', '导出验收单', null, 'Informationwork/receivingNote:exportExcel'), ('8a8182fb51a973b60151a975fc4e0000', '信息作业', '查看自动批次表', null, 'Informationwork/automaticBatchOperation:show'), ('8a8182fb51a973b60151a97674ee0001', '信息作业', '编辑自动批次表', null, 'Informationwork/automaticBatchOperation:edit'), ('8a8182fb51a973b60151a976fb4b0002', '信息作业', '添加自动批次表', null, 'Informationwork/automaticBatchOperation:add'), ('8a8182fb51a973b60151a97779220003', '信息作业', '删除自动批次表', null, 'Informationwork/automaticBatchOperation:del'), ('8a8182fb51a973b60151a978855a0004', '信息作业', '导出自动批次表', null, 'Informationwork/automaticBatchOperation:exportExcel'), ('8a8182fb51a9d7160151a9dafc2e0000', '信息作业', '查看机房进出登记记录表', null, 'Informationwork/roomRegistration:show'), ('8a8182fb51a9d7160151a9db850b0001', '信息作业', '添加机房进出登记记录表', null, 'Informationwork/roomRegistration:add'), ('8a8182fb51a9d7160151a9dbfd710002', '信息作业', '编辑机房进出登记记录表', null, 'Informationwork/roomRegistration:edit'), ('8a8182fb51a9d7160151a9dcb8530003', '信息作业', '删除机房进出登记记录表', null, 'Informationwork/roomRegistration:del'), ('8a8182fb51a9d7160151a9ddd4900004', '信息作业', '导出机房进出登记记录表', null, 'Informationwork/roomRegistration:exportExcel'), ('8a8182fb51aa5b730151aa5d72ca0000', '信息作业', '查看系统备份计划', null, 'Informationwork/planBackup:show'), ('8a8182fb51aa5b730151aa5dec660001', '信息作业', '添加系统备份计划', null, 'Informationwork/planBackup:add'), ('8a8182fb51aa5b730151aa5e51de0002', '信息作业', '编辑系统备份计划', null, 'Informationwork/planBackup:edit'), ('8a8182fb51aa5b730151aa5ead2a0003', '信息作业', '删除系统备份计划', null, 'Informationwork/planBackup:del'), ('8a8182fb51aa5b730151aa5f7fbb0004', '信息作业', '导出系统备份计划', null, 'Informationwork/planBackup:exportExcel'), ('8a8182fb51adcc7b0151add1660c0000', '信息作业', '查看系统更新申请', null, 'Informationwork/systemRenewalApplication:show'), ('8a8182fb51adcc7b0151add2068f0001', '信息作业', '添加系统更新申请', null, 'Informationwork/systemRenewalApplication:add'), ('8a8182fb51adcc7b0151add27c8a0002', '信息作业', '编辑系统更新申请', null, 'Informationwork/systemRenewalApplication:edit'), ('8a8182fb51adcc7b0151add3072d0003', '信息作业', '删除系统更新申请', null, 'Informationwork/systemRenewalApplication:del'), ('8a8182fb51adcc7b0151add3a3410004', '信息作业', '导出系统更新申请', null, 'Informationwork/systemRenewalApplication:exportExcel'), ('8a8182fb51ae14130151ae1648530000', '信息作业', '查看系统备份记录', null, 'Informationwork/systemBackupRecord:show'), ('8a8182fb51ae14130151ae70c7790001', '信息作业', '添加系统备份记录', null, 'Informationwork/systemBackupRecord:add'), ('8a8182fb51ae14130151ae7138190002', '信息作业', '编辑系统备份记录', null, ' Informationwork/systemBackupRecord:edit'), ('8a8182fb51ae14130151ae718fb90003', '信息作业', '删除系统备份记录', null, ' Informationwork/systemBackupRecord:del'), ('8a8182fb51ae14130151ae727c4d0004', '信息作业', '导出系统备份记录', null, 'Informationwork/systemBackupRecord:exportExcel'), ('8a8182fb51ae84e40151ae8888f20000', '信息作业', '编辑系统主机备份记录', null, 'Informationwork/systemBackupRecord:edit'), ('8a8182fb51ae84e40151ae8aaa420001', '信息作业', '删除系统主机备份记录', null, 'Informationwork/systemBackupRecord:del'), ('8a8182fb51aed5860151aed835980000', '信息作业', '查看系统数据转换计划', null, 'Informationwork/systemDataConversionClan:show'), ('8a8182fb51aed5860151aed99ef30001', '信息作业', '添加系统数据转换计划', null, 'Informationwork/systemDataConversionClan:add'), ('8a8182fb51aed5860151aeda0e0c0002', '信息作业', '编辑系统数据转换计划', null, 'Informationwork/systemDataConversionClan:edit'), ('8a8182fb51aed5860151aeda77d40003', '信息作业', '删除系统数据转换计划', null, 'Informationwork/systemDataConversionClan:del'), ('8a8182fb51aed5860151aedb8faa0004', '信息作业', '导出系统数据转换计划', null, 'Informationwork/systemDataConversionClan:exportExcel'), ('8a8182fb51af1c400151af1fa1370000', '信息作业', '添加系统数据转换申请', null, 'Informationwork/dataConversionApplication:add'), ('8a8182fb51af1c400151af2007bd0001', '信息作业', '查看系统数据转换申请', null, 'Informationwork/dataConversionApplication:show'), ('8a8182fb51af1c400151af2077cf0002', '信息作业', '编辑系统数据转换申请', null, 'Informationwork/dataConversionApplication:edit'), ('8a8182fb51af1c400151af20f05e0003', '信息作业', '删除系统数据转换申请', null, 'Informationwork/dataConversionApplication:del'), ('8a8182fb51af1c400151af21ab4c0004', '信息作业', '导出系统数据转换申请', null, 'Informationwork/dataConversionApplication:exportExcel'), ('8a8182fb51b4753f0151b47cba4b0000', '信息作业', '查看机房工作日志表', null, 'Informationwork/engineroom-log:show'), ('8a8182fb51c20e8b0151c21284500000', '信息作业', '添加机房工作日志表', null, 'Informationwork/engineroom-log:add'), ('8a8182fb51c20e8b0151c21344500001', '信息作业', '编辑机房工作日志表', null, 'Informationwork/engineroom-log:edit'), ('8a8182fb51c20e8b0151c213b2850002', '信息作业', '删除机房工作日志表', null, 'Informationwork/engineroom-log:del'), ('8a8182fb51c20e8b0151c2147ebe0003', '信息作业', '导出机房工作日志表', null, 'Informationwork/engineroom-log:exportExcel');
COMMIT;

-- ----------------------------
--  Records of `cde_role`
-- ----------------------------
BEGIN;
INSERT INTO `cde_role` VALUES ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '信息作业', null, '系统管理员', null);
COMMIT;

-- ----------------------------
--  Records of `cde_role_permission`
-- ----------------------------
BEGIN;
INSERT INTO `cde_role_permission` VALUES
 ('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a3609e0151a369924b0000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a3609e0151a369feed0001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a3609e0151a36a97370002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a3609e0151a36b540e0003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a3609e0151a36dcd1e0004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a893330151a8993d2a0000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a893330151a899929e0001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a893330151a89a1ce70002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a893330151a89a83910003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a893330151a89b2ab80004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a973b60151a975fc4e0000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a973b60151a97674ee0001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a973b60151a976fb4b0002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a973b60151a97779220003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a973b60151a978855a0004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a9d7160151a9dafc2e0000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a9d7160151a9db850b0001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a9d7160151a9dbfd710002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a9d7160151a9dcb8530003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a9d7160151a9ddd4900004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aa5b730151aa5d72ca0000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aa5b730151aa5dec660001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aa5b730151aa5e51de0002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aa5b730151aa5ead2a0003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aa5b730151aa5f7fbb0004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51adcc7b0151add1660c0000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51adcc7b0151add2068f0001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51adcc7b0151add27c8a0002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51adcc7b0151add3072d0003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51adcc7b0151add3a3410004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51ae14130151ae1648530000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51ae14130151ae70c7790001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51ae14130151ae7138190002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51ae14130151ae718fb90003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51ae84e40151ae8888f20000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51ae84e40151ae8aaa420001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aed5860151aed835980000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aed5860151aed99ef30001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aed5860151aeda0e0c0002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aed5860151aeda77d40003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51aed5860151aedb8faa0004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51af1c400151af1fa1370000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51af1c400151af2007bd0001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51af1c400151af2077cf0002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51af1c400151af20f05e0003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51af1c400151af21ab4c0004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51b4753f0151b47cba4b0000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c20e8b0151c21284500000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c20e8b0151c21344500001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c20e8b0151c213b2850002'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c20e8b0151c2147ebe0003');
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a4bc7a0151a4c1be5f0003'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a4bc7a0151a4c280a20004'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a4bc7a0151a4bf0f070000'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a4bc7a0151a4c0cc520001'),
('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51a4bc7a0151a4c15bab0002');
COMMIT;

