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
INSERT INTO `cde_menuitem` VALUES('11', null, 'icon-star', '信息作业', null, null, null, '11', null),  ('1102', null, 'icon-double-angle-right', '机房工作日志', null, null, '#feature/Informationwork/scaffold:engineroom-log', '2', '11'), ;

INSERT INTO `cde_permission` VALUES
('8a8182fb51b4753f0151b47cba4b0000', '信息作业', '查看机房工作日志表', null, 'Informationwork/engineroom-log:show'),
('8a8182fb51c20e8b0151c21284500000', '信息作业', '添加机房工作日志表', null, 'Informationwork/engineroom-log:add'),
('8a8182fb51c20e8b0151c21344500001', '信息作业', '编辑机房工作日志表', null, 'Informationwork/engineroom-log:edit'),
('8a8182fb51c20e8b0151c213b2850002', '信息作业', '删除机房工作日志表', null, 'Informationwork/engineroom-log:del'),
('8a8182fb51c20e8b0151c2147ebe0003', '信息作业', '导出机房工作日志表', null, 'Informationwork/engineroom-log:exportExcel');
COMMIT;

