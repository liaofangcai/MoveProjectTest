删除带办、已办。
delete from zda_process_approval_history;
delete from zda_process_task_info;
delete from zda_process_instance;
commit;
删除申请、报告、报销明细：
delete from bz_trip_report;
delete from bz_trip_apply;
delete from bz_trip_cost;
commit;
