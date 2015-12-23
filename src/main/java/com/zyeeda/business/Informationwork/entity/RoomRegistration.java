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
@Table(name = "BZ_ROOMREGISTRATION")
@Scaffold("/informationwork/roomRegistration")
public class RoomRegistration extends RevisionDomainEntity{

  private static final long serialVersionUID = 28277543938624745L;
  //编号
  private String systemUpdateRecordsNo;
  //日期
  private Date systemUpdateRecordsName;
  //进入时间
  private Date address;
  //是由
  private String operatingPersonnel;
  //离开时间
  private Date updateContent;
  //登记人
  private String operateTime;
  //备注
  private String mark;

  @NotBlank
  @Column(name = "F_UPDATERECORDSNO", length = 300)
  public String getSystemUpdateRecordsNo() {
    return systemUpdateRecordsNo;
  }
  public void setSystemUpdateRecordsNo(String systemUpdateRecordsNo) {
    this.systemUpdateRecordsNo = systemUpdateRecordsNo;
  }

  @NotNull
  @Temporal(TemporalType.DATE)
  @Column(name = "F_UPDATERECORDSNAME")
  public Date getSystemUpdateRecordsName() {
    return systemUpdateRecordsName;
  }
  public void setSystemUpdateRecordsName(Date systemUpdateRecordsName) {
    this.systemUpdateRecordsName = systemUpdateRecordsName;
  }

  @NotNull
  @DateTime
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
  @Column(name = "F_ADDRESS")
  public Date getAddress() {
    return address;
  }
  public void setAddress(Date address) {
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

  @NotBlank
  @Column(name = "F_OPERATETIME")
  public String getOperateTime() {
    return operateTime;
  }
  public void setOperateTime(String operateTime) {
    this.operateTime = operateTime;
  }

  @NotNull
  @DateTime
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
  @Column(name = "F_UPDATECONTENT")
  public Date getUpdateContent() {
    return updateContent;
  }
  public void setUpdateContent(Date updateContent) {
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
