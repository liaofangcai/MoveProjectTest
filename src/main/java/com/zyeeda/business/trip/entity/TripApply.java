package com.zyeeda.business.trip.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.Transient;
import javax.persistence.TemporalType;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.business.process.entity.ProcessRevisionDomainEntity;
import com.zyeeda.business.process.entity.ApprovalHistory;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.organization.entity.Account;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

/**
 * 出差申请单
 *
 * $Author$
 */
@Entity
@Table(name = "BZ_TRIP_APPLY")
@Scaffold("/trip/trip-apply")
public class TripApply extends ProcessRevisionDomainEntity {

    /**
     * 序列化
     */
    private static final long serialVersionUID = 3728277543938624745L;

    /**
     * 申请单号
     */
    private String applyNo;

    /**
     * 申请人
     */
    private Account applier;

    /**
     * 部门
     */
    private Department department;

    /**
     * 职务
     */
    private String job;

    /**
     * 申请日期
     */
    private Date appliedTime;

    /**
     * 出发日期
     */
    private Date leavedTime;

    /**
     * 出差地点
     */
    private String tripPlace;

    /**
     * 职务代理人
     */
    private String deputy;

    /**
     * 出差类别
     */
    private String tripType;

    /**
     * 出差事由
     */
    private String tripReason;

    /**
     * 预计差期
     */
    private Integer forecastedTime;

    /**
     * 差旅费用预计
     */
    private Double forecastedCost;

    /**
     * 住宿费
     */
    private Double stayCost;

    /**
     * 住宿费备注
     */
    private String stayCostRemark;

    /**
     * 交通费
     */
    private Double trafficCost;

    /**
     * 交通费备注
     */
    private String trafficCostRemark;

    /**
     * 业务招待费
     */
    private Double entertainCost;

    /**
     * 业务招待费备注
     */
    private String entertainCostRemark;

    /**
     * 其它预计费用
     */
    private Double otherForecastCost;

    /**
     * 其它预计费用备注
     */
    private String otherForecastCostRemark;
    /**
     * 审批历史
     */
    private List<ApprovalHistory> approvalHistories;
    /**
     * 是否填写报告
     */
    private Boolean haveReport;

    @Column(name = "F_APPLY_NO", length = 300)
    @NullableSize(max = 166)
    public String getApplyNo() {
        return applyNo;
    }

    public void setApplyNo(String applyNo) {
        this.applyNo = applyNo;
    }

    @Column(name = "F_JOB", length = 300)
    @NotBlank
    @NullableSize(max = 166)
    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    @ManyToOne
    @NotNull
    @JoinColumn(name = "F_ACCOUNT_ID")
    public Account getApplier() {
        return applier;
    }

    public void setApplier(Account applier) {
        this.applier = applier;
    }

    @ManyToOne
    @NotNull
    @JoinColumn(name = "F_DEPARTMENT_ID")
    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "F_APPLIED_TIME")
    public Date getAppliedTime() {
        return appliedTime;
    }

    public void setAppliedTime(Date appliedTime) {
        this.appliedTime = appliedTime;
    }

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "F_LEAVED_TIME")
    public Date getLeavedTime() {
        return leavedTime;
    }

    public void setLeavedTime(Date leavedTime) {
        this.leavedTime = leavedTime;
    }

    @Column(name = "F_TRIP_PLACE", length = 300)
    @NotBlank
    @NullableSize(max = 166)
    public String getTripPlace() {
        return tripPlace;
    }

    public void setTripPlace(String tripPlace) {
        this.tripPlace = tripPlace;
    }

    @Column(name = "F_DEPUTY", length = 300)
    @NullableSize(max = 166)
    public String getDeputy() {
        return deputy;
    }

    public void setDeputy(String deputy) {
        this.deputy = deputy;
    }

    @Column(name = "F_TRIP_TYPE", length = 300)
    @NullableSize(max = 166)
    public String getTripType() {
        return tripType;
    }

    public void setTripType(String tripType) {
        this.tripType = tripType;
    }

    @Column(name = "F_TRIP_REASON", length = 300)
    @NullableSize(max = 166)
    public String getTripReason() {
        return tripReason;
    }

    public void setTripReason(String tripReason) {
        this.tripReason = tripReason;
    }

    @Column(name = "F_FORECASTED_TIME", length = 20)
    @Min(value = 0)
    public Integer getForecastedTime() {
        return forecastedTime;
    }

    public void setForecastedTime(Integer forecastedTime) {
        this.forecastedTime = forecastedTime;
    }

    @Column(name = "F_FORECASTED_COST", length = 20)
    @Min(value = 0)
    public Double getForecastedCost() {
        return forecastedCost;
    }

    public void setForecastedCost(Double forecastedCost) {
        this.forecastedCost = forecastedCost;
    }

    @Column(name = "F_STAY_COST", length = 20)
    @Min(value = 0)
    public Double getStayCost() {
        return stayCost;
    }

    public void setStayCost(Double stayCost) {
        this.stayCost = stayCost;
    }

    @Column(name = "F_STAY_COST_REMARK", length = 300)
    @NullableSize(max = 166)
    public String getStayCostRemark() {
        return stayCostRemark;
    }

    public void setStayCostRemark(String stayCostRemark) {
        this.stayCostRemark = stayCostRemark;
    }

    @Column(name = "F_TRAFFIC_COST", length = 20)
    @Min(value = 0)
    public Double getTrafficCost() {
        return trafficCost;
    }

    public void setTrafficCost(Double trafficCost) {
        this.trafficCost = trafficCost;
    }

    @Column(name = "F_TRAFFIC_COST_REMARK", length = 300)
    @NullableSize(max = 166)
    public String getTrafficCostRemark() {
        return trafficCostRemark;
    }

    public void setTrafficCostRemark(String trafficCostRemark) {
        this.trafficCostRemark = trafficCostRemark;
    }

    @Column(name = "F_ENTERTAIN_COST", length = 20)
    @Min(value= 0)
    public Double getEntertainCost() {
        return entertainCost;
    }

    public void setEntertainCost(Double entertainCost) {
        this.entertainCost = entertainCost;
    }

    @Column(name = "F_ENTERTAIN_COST_REMARK", length = 300)
    @NullableSize(max = 166)
    public String getEntertainCostRemark() {
        return entertainCostRemark;
    }

    public void setEntertainCostRemark(String entertainCostRemark) {
        this.entertainCostRemark = entertainCostRemark;
    }

    @Column(name = "F_OTHER_FORECAST_COST", length = 20)
    @Min(value= 0)
    public Double getOtherForecastCost() {
        return otherForecastCost;
    }

    public void setOtherForecastCost(Double otherForecastCost) {
        this.otherForecastCost = otherForecastCost;
    }

    @Column(name = "F_OTHER_FORECAST_COST_REMARK", length = 300)
    @NullableSize(max = 166)
    public String getOtherForecastCostRemark() {
        return otherForecastCostRemark;
    }

    public void setOtherForecastCostRemark(String otherForecastCostRemark) {
        this.otherForecastCostRemark = otherForecastCostRemark;
    }

     @Transient
    public List<ApprovalHistory> getApprovalHistories() {
        return approvalHistories;
    }

    public void setApprovalHistories(List<ApprovalHistory> approvalHistories) {
        this.approvalHistories = approvalHistories;
    }

    @Column(name = "F_HAVEREPORT")
    public Boolean getHaveReport(){
        return haveReport;
    }

    public void setHaveReport(Boolean haveReport){
        this.haveReport = haveReport;
    }
}
