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
@Table(name = "BZ_INFORMATIONWORK_ENGINEROOM_LOG")
@Scaffold("/informationwork/engineroom-log")
public class EngineroomLog extends RevisionDomainEntity{

  private static final long serialVersionUID = 2728277543938624745L;

  private String engineroomLogNo;

  private Date engineroomLogDate;

  private String engineroomLogWork;

  private String mark;



  @NotBlank
  @Column(name = "F_ENGINEROOMLOG_NO", length = 300)
  public String getEngineroomLogNo() {
  	return engineroomLogNo;
  }
  public void setEngineroomLogNo(String engineroomLogNo) {
  	this.engineroomLogNo = engineroomLogNo;
  }

  @Temporal(TemporalType.DATE)
  @Column(name = "F_ENGINEROOMLOG_DATE")
  public Date getEngineroomLogDate() {
    return engineroomLogDate;
  }
  public void setEngineroomLogDate(Date engineroomLogDate) {
    this.engineroomLogDate = engineroomLogDate;
  }

  @NotBlank
  @Column(name = "F_ENGINEROOMLOG_WORK", length = 300)
  public String getEngineroomLogWork() {
    return engineroomLogWork;
  }
  public void setEngineroomLogWork(String engineroomLogWork) {
    this.engineroomLogWork = engineroomLogWork;
  }

  @Column(name = "F_MARK")
  public String getMark() {
    return mark;
  }
  public void setMark(String mark) {
    this.mark = mark;
  }
}
