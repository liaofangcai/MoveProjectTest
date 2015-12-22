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
@Table(name = "BZ_PLANBACKUP")
@Scaffold("/informationwork/planBackup")
public class PlanBackup extends RevisionDomainEntity{

  private static final long serialVersionUID = 2827543938624745L;
  //编号
  private String systemUpdateRecordsNo;
  //系统名称
  private String name;
  //计划备份时间
  private Date systemUpdateRecordsName;
  //备份方式
  private String address;
  //备份人
  private String operatingPersonnel;
  //备份格式
  private String updateContent;
  //内容
  private String operateTime;
  //备注
  private String mark;

  @NotBlank
  @Column(name = "F_NAME")
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  @NotBlank
  @Column(name = "F_SYSTEMUPDATERECORDSNO", length = 300)
  public String getSystemUpdateRecordsNo() {
    return systemUpdateRecordsNo;
  }
  public void setSystemUpdateRecordsNo(String systemUpdateRecordsNo) {
    this.systemUpdateRecordsNo = systemUpdateRecordsNo;
  }

  @NotNull
  @DateTime
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
  @Column(name = "F_SYSTEMUPDATERECORDSNAME")
  public Date getSystemUpdateRecordsName() {
    return systemUpdateRecordsName;
  }
  public void setSystemUpdateRecordsName(Date systemUpdateRecordsName) {
    this.systemUpdateRecordsName = systemUpdateRecordsName;
  }

  @NotBlank
  @Column(name = "F_ADDRESS")
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

  @Column(name = "F_OPERATETIME")
  public String getOperateTime() {
    return operateTime;
  }
  public void setOperateTime(String operateTime) {
    this.operateTime = operateTime;
  }

  @NotBlank
  @Column(name = "F_UPDATECONTENT")
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
}
