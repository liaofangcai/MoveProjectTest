-- 删除待办、已办--
delete from zda_process_approval_history ;
delete from zda_process_task_info ;
delete from zda_process_instance ;
commit;

-- 删除通知 --
delete from zda_notice_account ;
delete from zda_notice_department ;
delete from zda_notice_role ;
delete from zda_my_notice ;
delete from zda_notice ;
commit;

-- 删除行程及差旅费用报销明细 --
delete from bz_trip_cost;
-- 删除出差申请 --
delete from bz_trip_apply;
-- 删除出差申请报告 --
delete from bz_trip_report;
commit;
