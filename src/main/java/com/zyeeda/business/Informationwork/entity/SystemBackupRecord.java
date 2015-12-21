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
@Table(name = "bz_systemBackupRecord")
@Scaffold("/informationwork/systemBackupRecord")
public class SystemBackupRecord extends RevisionDomainEntity{

  private static final long serialVersionUID = 2827543938624745L;
  //编号
  private String systemBackupRecordNo;
  //备份时间
  private Date backupTime ;
  //备份方式
  private String backupMethod;
  //备份人
  private String backupPersonnel;
  //备份格式
  private String backupFormat;
  //备份容量
  private String backupCapacity;
  //备份内容
  private String backupContent;
  //存放地址
  private String backupAddress;
  //备注
  private String mark;


  @NotBlank
  @Column(name="f_systemBackupRecordNo")
  public String getSystemBackupRecordNo() {
    return systemBackupRecordNo;
  }
  public void setSystemBackupRecordNo(String systemBackupRecordNo) {
    this.systemBackupRecordNo = systemBackupRecordNo;
  }
  @NotNull
  @DateTime
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
  @Column(name="f_backupTime")
  public Date getBackupTime() {
    return backupTime;
  }
  public void setBackupTime(Date backupTime) {
    this.backupTime = backupTime;
  }
  @NotBlank
  @Column(name="f_backupMethod")
  public String getBackupMethod() {
    return backupMethod;
  }
  public void setBackupMethod(String backupMethod) {
    this.backupMethod = backupMethod;
  }
  @NotBlank
  @Column(name="f_backupPersonnel")
  public String getBackupPersonnel() {
    return backupPersonnel;
  }
  public void setBackupPersonnel(String backupPersonnel) {
    this.backupPersonnel = backupPersonnel;
  }
  @NotBlank
  @Column(name="f_backupFormat")
  public String getBackupFormat() {
    return backupFormat;
  }
  public void setBackupFormat(String backupFormat) {
    this.backupFormat = backupFormat;
  }
  @NotBlank
  @Column(name="f_backupCapacity")
  public String getBackupCapacity() {
    return backupCapacity;
  }
  public void setBackupCapacity(String backupCapacity) {
    this.backupCapacity = backupCapacity;
  }
  @NotBlank
  @Column(name="f_backupContent")
  public String getBackupContent() {
    return backupContent;
  }
  public void setBackupContent(String backupContent) {
    this.backupContent = backupContent;
  }
  @NotBlank
  @Column(name="f_backupAddress")
  public String getBackupAddress() {
    return backupAddress;
  }
  public void setBackupAddress(String backupAddress) {
    this.backupAddress = backupAddress;
  }
  @Column(name="f_mark")
  public String getMark() {
    return mark;
  }
  public void setMark(String mark) {
    this.mark = mark;
  }






}
