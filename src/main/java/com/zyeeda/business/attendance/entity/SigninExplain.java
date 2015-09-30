package com.zyeeda.business.attendance.entity;

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

@Entity
@Table(name = "bz_attendance_signinexplain")
@Scaffold("/attendance/signin-explain")
public class SigninExplain extends ProcessRevisionDomainEntity{
    /**
     * 序列化
     */
    private static final long serialVersionUID = 3728277543938624745L;

    /**
     * 请假申请单号
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
     * 申请日期
     */
    private Date appliedDate;

    /**
     * 职位
     */
    private String job;

    /**
     * 未打卡日期
     */
    private Date signinDate;

    /**
     * 未打卡时间
     */
    private String signinTime;

    /**
     * 未打卡原因
     */
    private String signinReason;
    /**
    * 审批历史
    */
    private List<ApprovalHistory> approvalHistories;

    @Column(name = "f_apply_no", length = 300)
    @NullableSize(max = 166)
    public String getApplyNo() {
      return applyNo;
    }
    public void setApplyNo(String applyNo) {
      this.applyNo = applyNo;
    }

    @ManyToOne
    @NotNull
    @JoinColumn(name = "f_account_id")
    public Account getApplier() {
        return applier;
    }
    public void setApplier(Account applier) {
        this.applier = applier;
    }

    @ManyToOne
    @NotNull
    @JoinColumn(name = "f_department_id")
  	public Department getDepartment() {
  		return department;
  	}
  	public void setDepartment(Department department) {
  		this.department = department;
  	}

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "f_applied_time")
  	public Date getAppliedDate() {
  		return appliedDate;
  	}
  	public void setAppliedDate(Date appliedDate) {
  		this.appliedDate = appliedDate;
  	}

    @NotBlank
    @Column(name = "f_job", length = 300)
    @NullableSize(max = 166)
  	public String getJob() {
  		return job;
  	}
  	public void setJob(String job) {
  		this.job = job;
  	}

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "f_signin_date")
  	public Date getSigninDate() {
  		return signinDate;
  	}
  	public void setSigninDate(Date signinDate) {
  		this.signinDate = signinDate;
  	}

    @NotBlank
    @Column(name = "f_signin_time", length = 300)
    @NullableSize(max = 166)
  	public String getSigninTime() {
  		return signinTime;
  	}
  	public void setSigninTime(String signinTime) {
  		this.signinTime = signinTime;
  	}

    @NotBlank
    @Column(name = "f_signin_reason", length = 300)
    @NullableSize(max = 166)
  	public String getSigninReason() {
  		return signinReason;
  	}
  	public void setSigninReason(String signinReason) {
  		this.signinReason = signinReason;
  	}

    @Transient
    public List<ApprovalHistory> getApprovalHistories() {
        return approvalHistories;
    }
    public void setApprovalHistories(List<ApprovalHistory> approvalHistories) {
        this.approvalHistories = approvalHistories;
    }

}
