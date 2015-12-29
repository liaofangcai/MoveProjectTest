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
@Table(name = "BZ_AUTOMATICBATCHOPERATION")
@Scaffold("/informationwork/automaticBatchOperation")
public class AutomaticBatchOperation extends RevisionDomainEntity {

	private static final long serialVersionUID = 728277543938624745L;

      private String name;

	private String systemUpdateRecordsNo;

	private String systemUpdateRecordsName;
      //主机地址
      private String address;
      //job名称
      private String operatingPersonnel;
      //JOB内容
      private String updateContent;
      //运行时间
      private Date operateTime;
      //备注
      private String mark;

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

  	@Column(name = "F_ADDRESS", length = 300)
  	public String getAddress() {
  		return this.address;
  	}

  	public void setAddress(String address) {
  		this.address = address;
  	}


  @Column(name = "F_OPERATINGPERSONNEL", length = 300)
  public String getOperatingPersonnel() {
    return operatingPersonnel;
  }
  public void setOperatingPersonnel(String operatingPersonnel) {
    this.operatingPersonnel = operatingPersonnel;
  }

  @Column(name = "F_OPERATETIME")
  @Temporal(TemporalType.DATE)
  public Date getOperateTime() {
    return operateTime;
  }
  public void setOperateTime(Date operateTime) {
    this.operateTime = operateTime;
  }

  @NotBlank
  @Column(name = "F_UPDATECONTENT", length = 2000)
  @NullableSize(max = 1333)
  public String getUpdateContent() {
    return updateContent;
  }
  public void setUpdateContent(String updateContent) {
    this.updateContent = updateContent;
  }

  @Column(name = "F_MARK", length = 600)
  public String getMark() {
    return mark;
  }
  public void setMark(String mark) {
    this.mark = mark;
  }

  @Column(name = "F_NAME")
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
}
