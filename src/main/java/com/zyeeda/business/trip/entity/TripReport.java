package com.zyeeda.business.trip.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.business.process.entity.ProcessRevisionDomainEntity;

import com.zyeeda.business.process.entity.ApprovalHistory;

import com.zyeeda.cdeio.commons.resource.entity.Attachment;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

/**
 * 出差任务报告书
 *
 * $Author$
 */
@Entity
@Table(name = "BZ_TRIP_REPORT")
@Scaffold("/trip/trip-report")
public class TripReport extends ProcessRevisionDomainEntity {

    /**
     * 序列化
     */
    private static final long serialVersionUID = 3728277543938624745L;

    /**
     * 出差申请单
     */
    private TripApply tripApply;

    /**
     * 开始时间
     */
    private Date startTime;

    /**
     * 结束时间
     */
    private Date endTime;

    /**
     * 出差天数
     */
    private String tripDays;

    /**
     * 出差任务
     */
    private String tripTask;

    /**
     * 执行情形
     */
    private String completion;

    /**
     * 附件
     */
    private Attachment attachment;

    /**
     *  报销明细表
     */
    private List<TripCost> tripCosts;

    /**
     * 备注
     *
     */
    private String remark;

    /**
     * 审批历史
     */
    private List<ApprovalHistory> approvalHistories;

    @OneToOne
    @JoinColumn(name = "F_TRIP_APPLY_ID")
    public TripApply getTripApply() {
        return tripApply;
    }

    public void setTripApply(TripApply tripApply) {
        this.tripApply = tripApply;
    }

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "F_START_TIME")
    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "F_END_TIME")
    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    @Column(name = "F_TRIP_DAYS", length = 300)
    @NotBlank
    @NullableSize(max = 166)
    public String getTripDays() {
        return tripDays;
    }

    public void setTripDays(String tripDays) {
        this.tripDays = tripDays;
    }

    @Column(name = "F_TRIP_TASK", length = 300)
    @NotBlank
    @NullableSize(max = 166)
    public String getTripTask() {
        return tripTask;
    }

    public void setTripTask(String tripTask) {
        this.tripTask = tripTask;
    }

    @Column(name = "F_COMPLETION", length = 300)
    @NotBlank
    @NullableSize(max = 166)
    public String getCompletion() {
        return completion;
    }

    public void setCompletion(String completion) {
        this.completion = completion;
    }

    @OneToOne
    @JoinColumn(name = "F_ATTACHMENT_ID")
    public Attachment getAttachment() {
        return attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }

    @OneToMany(mappedBy = "tripReport")
    public List<TripCost> getTripCosts() {
        return tripCosts;
    }

    public void setTripCosts(List<TripCost> tripCosts) {
        this.tripCosts = tripCosts;
    }

    @Column(name = "F_REMARK", length = 300)
    @NullableSize(max = 166)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Transient
    public List<ApprovalHistory> getApprovalHistories() {
        return approvalHistories;
    }

    public void setApprovalHistories(List<ApprovalHistory> approvalHistories) {
        this.approvalHistories = approvalHistories;
    }
}
