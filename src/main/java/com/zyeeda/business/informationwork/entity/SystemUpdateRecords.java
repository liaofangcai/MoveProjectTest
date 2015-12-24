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

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "BZ_INWORK_DATERECORD")
@Scaffold("/informationwork/systemUpdateRecords")
public class SystemUpdateRecords extends RevisionDomainEntity{

  private static final long serialVersionUID = 2728277543938624745L;
  //记录编号
  private String systemUpdateRecordsNo;
  //主机名称
  private String systemUpdateRecordsName;
  //主机地址
  private String address;
  //操作人
  private String operatingPersonnel;
  //更新内容
  private String updateContent;
  //操作时间
  private Date operateTime;
  //备注
  private String mark;
  //制表日
  private Date makeTable;

  @NotBlank
  @Column(name = "F_SYSTEMUPDATERECORDSNO", length = 300)
  public String getSystemUpdateRecordsNo() {
    return systemUpdateRecordsNo;
  }
  public void setSystemUpdateRecordsNo(String systemUpdateRecordsNo) {
    this.systemUpdateRecordsNo = systemUpdateRecordsNo;
  }

  @NotBlank
  @Column(name = "F_SYSTEMUPDATERECORDSNAME", length = 300)
  public String getSystemUpdateRecordsName() {
  	return systemUpdateRecordsName;
  }
  public void setSystemUpdateRecordsName(String systemUpdateRecordsName) {
  	this.systemUpdateRecordsName = systemUpdateRecordsName;
  }

  @NotBlank
  @Column(name = "F_ADDRESS", length = 300)
  public String getAddress() {
  	return address;
  }
  public void setAddress(String address) {
  	this.address = address;
  }

  @NotBlank
  @Column(name = "F_OPERATINGPERSONNEL", length = 300)
  public String getOperatingPersonnel() {
  	return operatingPersonnel;
  }
  public void setOperatingPersonnel(String operatingPersonnel) {
  	this.operatingPersonnel = operatingPersonnel;
  }

  @NotNull
  @Column(name = "F_OPERATETIME")
  @Temporal(TemporalType.DATE)
  public Date getOperateTime() {
  	return operateTime;
  }
  public void setOperateTime(Date operateTime) {
  	this.operateTime = operateTime;
  }

  @NotBlank
  @Column(name = "F_UPDATECONTENT")
  @NullableSize(max = 1333)
  public String getUpdateContent() {
  	return updateContent;
  }
  public void setUpdateContent(String updateContent) {
  	this.updateContent = updateContent;
  }

  @Column(name = "F_MARK")
  public String getMark() {
  	return mark;
  }
  public void setMark(String mark) {
  	this.mark = mark;
  }

  @Column(name="F_MAKETABLE")
  @Temporal(TemporalType.DATE)
  public Date getMakeTable(){
  	return makeTable;
  }
  public void setMakeTable(Date makeTable){
  	this.makeTable=makeTable;
  }

}
