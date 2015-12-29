package com.zyeeda.business.informationwork.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.persistence.Transient;
import javax.persistence.Temporal;
import javax.persistence.OrderBy;
import javax.persistence.TemporalType;

import org.hibernate.validator.constraints.NotBlank;
import com.zyeeda.cdeio.commons.annotation.scaffold.DateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "BZ_INFWORK_CHANGEREQUEST")
@Scaffold("/informationwork/changerequest")
public class ChangeRequest extends RevisionDomainEntity{

  private static final long serialVersionUID = 272877543938624745L;
  //编号
  private String number;
  //制表日期
  private Date createTime;
  //项目名称
  private String name;
  //项目负责人
  private String projectLeader;
  //变更申请
  //变更申请人
  private String  requestPerson;
  //申请日期
  private Date  applicationTime;
  //所处阶段
  private String  stage;
  //变更内容
  private String changeContent;
  //变更原因
  private String changInflunence;
  //变更影响
  private String changReason;
  //审批变更申请
  //ccb审批的意见
  private String approvalOpinion;
  //ccb负责人签字
  private String  ccbsign;
  //日期
  private Date  signTime;
  //批准变更的对象
  private String objectForApproval;
  //变更执行人
  private String changeTheExecutive;
  //变更执行时间限制
  private Date timeLimit;
  //变更执行跟踪
  //变更后的对象
  private String objectAfterChange;
  //负责人
  private String changPerson;
  //变更完成日期
  private Date finishTime;
  //评审结论
  private String result;
  //评审人签字
  private String reviewSign;
  //日期
  private Date reviewTime;
  //评审会签
  private String reviewAndCountersign;
  //ccb审批的意见
  private String  opinion;
  //ccb负责人签字
  private String sign;
  //日期
  private Date time;
  //变更记录人
  private String changeRecords;
  //变更完成时间
  private Date completionTime;

  @NotBlank
  @Column(name = "F_NUMBER", length = 300)
  public String getNumber() {
    return number;
  }
  public void setNumber(String number) {
    this.number = number;
  }

  @Column(name = "F_CREATETIME")
  @Temporal(TemporalType.DATE)
  public Date getCreateTime() {
    return createTime;
  }
  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }

  @NotBlank
  @Column(name = "F_NAME", length = 300)
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  @Column(name = "F_LEADER")
  public String getProjectLeader() {
    return projectLeader;
  }
  public void setProjectLeader(String projectLeader) {
    this.projectLeader = projectLeader;
  }

  @Column(name = "F_REQUESTPERSON")
  public String getRequestPerson() {
    return requestPerson;
  }
  public void setRequestPerson(String requestPerson) {
    this.requestPerson = requestPerson;
  }

  @Temporal(TemporalType.DATE)
  @Column(name = "F_APPLICATIONTIME")
  public Date getApplicationTime() {
    return applicationTime;
  }
  public void setApplicationTime(Date applicationTime) {
    this.applicationTime = applicationTime;
  }

  @Column(name = "F_STAGE")
  public String getStage() {
    return stage;
  }
  public void setStage(String stage) {
    this.stage = stage;
  }

  @Column(name = "F_CAHNGCONTEN", length = 2000)
  public String getChangeContent() {
    return changeContent;
  }
  public void setChangeContent(String changeContent) {
    this.changeContent = changeContent;
  }

  @Column(name = "F_CHANGINFLUENCE", length = 2000)
  public String getChangInflunence() {
    return changInflunence;
  }
  public void setChangInflunence(String changInflunence) {
    this.changInflunence = changInflunence;
  }

  @Column(name = "F_CHANGREASON", length = 2000)
  public String getChangReason() {
    return changReason;
  }
  public void setChangReason(String changReason) {
    this.changReason = changReason;
  }

  @Column(name = "F_APPROVALOPINION", length = 2000)
  public String getApprovalOpinion() {
    return approvalOpinion;
  }
  public void setApprovalOpinion(String approvalOpinion) {
    this.approvalOpinion = approvalOpinion;
  }

  @Column(name = "F_CCBSIGN")
  public String getCcbsign() {
    return ccbsign;
  }
  public void setCcbsign(String ccbsign) {
    this.ccbsign = ccbsign;
  }

  @Column(name = "F_SIGNTIME")
  @Temporal(TemporalType.DATE)
  public Date getSignTime() {
    return signTime;
  }
  public void setSignTime(Date signTime) {
    this.signTime = signTime;
  }

  @Column(name = "F_OBJECTFORAPPROVAL")
  public String getObjectForApproval() {
    return objectForApproval;
  }
  public void setObjectForApproval(String objectForApproval) {
    this.objectForApproval = objectForApproval;
  }

  @Column(name = "F_CHANGETHEEXECUTIVE")
  public String getChangeTheExecutive() {
    return changeTheExecutive;
  }
  public void setChangeTheExecutive(String changeTheExecutive) {
    this.changeTheExecutive = changeTheExecutive;
  }

  @DateTime
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
  @Column(name = "F_TIMELIMIT")
  public Date getTimeLimit() {
    return timeLimit;
  }
  public void setTimeLimit(Date timeLimit) {
    this.timeLimit = timeLimit;
  }

  @Column(name = "F_OBJECTAFTERCHANGE", length = 2000)
  public String getObjectAfterChange() {
    return objectAfterChange;
  }
  public void setObjectAfterChange(String objectAfterChange) {
    this.objectAfterChange = objectAfterChange;
  }

  @Column(name = "F_CHANGPERSON")
  public String getChangPerson() {
    return changPerson;
  }
  public void setChangPerson(String changPerson) {
    this.changPerson = changPerson;
  }

  @Temporal(TemporalType.DATE)
  @Column(name = "F_FINISHTIME")
  public Date getFinishTime() {
    return finishTime;
  }
  public void setFinishTime(Date finishTime) {
    this.finishTime = finishTime;
  }

  @Column(name = "F_RESULT")
  public String getResult() {
    return result;
  }
  public void setResult(String result) {
    this.result = result;
  }

  @Column(name = "F_REVIEWSIGN")
  public String getReviewSign() {
    return reviewSign;
  }
  public void setReviewSign(String reviewSign) {
    this.reviewSign = reviewSign;
  }

  @Column(name = "F_REVIEWTIME")
  @Temporal(TemporalType.DATE)
  public Date getReviewTime() {
    return reviewTime;
  }
  public void setReviewTime(Date reviewTime) {
    this.reviewTime = reviewTime;
  }

  @Column(name = "F_REVIWCONTERSIGN", length = 2000)
  public String getReviewAndCountersign() {
    return reviewAndCountersign;
  }
  public void setReviewAndCountersign(String reviewAndCountersign) {
    this.reviewAndCountersign = reviewAndCountersign;
  }

  @Column(name = "F_OPINION")
  public String getOpinion() {
    return opinion;
  }
  public void setOpinion(String opinion) {
    this.opinion = opinion;
  }

  @Column(name = "F_SIGN")
  public String getSign() {
    return sign;
  }
  public void setSign(String sign) {
    this.sign = sign;
  }

  @Column(name = "F_TIME")
  @Temporal(TemporalType.DATE)
  public Date getTime() {
    return time;
  }
  public void setTime(Date time) {
    this.time = time;
  }

  @Column(name = "F_CHANGRECORDS")
  public String getChangeRecords() {
    return changeRecords;
  }
  public void setChangeRecords(String changeRecords) {
    this.changeRecords = changeRecords;
  }

  @DateTime
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
  @Column(name = "F_COMPLETIONTIME")
  public Date getCompletionTime() {
    return completionTime;
  }
  public void setCompletionTime(Date completionTime) {
    this.completionTime = completionTime;
  }

}
