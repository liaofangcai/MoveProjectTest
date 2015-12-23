BEGIN;
INSERT INTO `cde_menuitem` (`F_ID`, `F_DESC`, `F_ICON`, `F_NAME`, `F_OPENED`, `F_OPTION`, `F_PATH`, `F_RANK`, `F_PARENT_ID`)
VALUES
	('1112', NULL, 'icon-double-angle-right', '变更申请', NULL, NULL, '#feature/Informationwork/scaffold:changerequest', 26, ’10’);


INSERT INTO `cde_permission` (`F_ID`, `F_DESC`, `F_NAME`, `F_SCAFFOLD`, `F_VALUE`)
VALUES
	('8a8182fb51c8aa000151c8aecb350000', '信息作业', '查看变更申请单', NULL, 'Informationwork/changerequest:show'),
	('8a8182fb51c8aa000151c8b1803c0001', '信息作业', '添加变更申请单', NULL, 'Informationwork/changerequest:add'),
	('8a8182fb51c8aa000151c8b1e3e60002', '信息作业', '编辑变更申请单', NULL, 'Informationwork/changerequest:edit'),
	('8a8182fb51c8aa000151c8b23d060003', '信息作业', '删除变更申请单', NULL, 'Informationwork/changerequest:del'),
	('8a8182fb51c8aa000151c8b2b5d60004', '信息作业', '导出变更申请单', NULL, 'Informationwork/changerequest:exportExcel');


INSERT INTO `cde_role_permission` (`F_ROLE_ID`, `F_PERMISSION_ID`)
VALUES
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c8aa000151c8aecb350000');
INSERT INTO `cde_role_permission` (`F_ROLE_ID`, `F_PERMISSION_ID`)
VALUES
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c8aa000151c8b1803c0001');
INSERT INTO `cde_role_permission` (`F_ROLE_ID`, `F_PERMISSION_ID`)
VALUES
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c8aa000151c8b1e3e60002');
INSERT INTO `cde_role_permission` (`F_ROLE_ID`, `F_PERMISSION_ID`)
VALUES
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c8aa000151c8b23d060003');
INSERT INTO `cde_role_permission` (`F_ROLE_ID`, `F_PERMISSION_ID`)
VALUES
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fb51c8aa000151c8b2b5d60004');
COMMIT;
