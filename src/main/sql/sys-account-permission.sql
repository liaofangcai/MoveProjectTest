BEGIN;
INSERT INTO `cde_menuitem` (`F_ID`, `F_DESC`, `F_ICON`, `F_NAME`, `F_OPENED`, `F_OPTION`, `F_PATH`, `F_RANK`, `F_PARENT_ID`)
VALUES
	('1001', NULL, 'icon-double-angle-right', '信息系统账号权限申请信息', NULL, NULL, '#feature/experiment/scaffold:interformation', 1, '10');


INSERT INTO `cde_permission` (`F_ID`, `F_DESC`, `F_NAME`, `F_SCAFFOLD`, `F_VALUE`)
VALUES
	('8a8182fe517fb3a6015180ab37860001', '信息账号权限管理', '查看信息账号权限管理', NULL, 'experiment/interformation:show'),
	('8a8182fe517fb3a6015180f49aa90002', '信息账号权限管理', '更新信息账号权限管理', NULL, 'experiment/interformation:edit'),
	('8a8182fe517fb3a6015180f650cb0003', '信息账号权限管理', '添加信息账号权限管理', NULL, 'experiment/interformation:add'),
	('8a8182fe517fb3a6015180f70a5e0004', '信息账号权限管理', '删除信息账号权限管理', NULL, 'experiment/interformation:del'),
	('8a8182fe51849874015184d1744d0003', '信息账号权限管理', '打印信息账号权限管理', NULL, 'experiment/interformation:print');

INSERT INTO `cde_role_permission` (`F_ROLE_ID`, `F_PERMISSION_ID`)
VALUES
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fe517fb3a6015180ab37860001'),
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fe517fb3a6015180f49aa90002'),
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fe517fb3a6015180f650cb0003'),
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fe517fb3a6015180f70a5e0004'),
	('26c49fad-dc2b-4b9a-b8fc-88324e3e0d70', '8a8182fe51849874015184d1744d0003');

COMMIT;