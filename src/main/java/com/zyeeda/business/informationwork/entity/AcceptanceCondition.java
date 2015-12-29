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
import com.zyeeda.business.informationwork.entity.ReceivingNote;

@Entity
@Table(name = "BZ_ACCEPTANCECONDITION")
@Scaffold("/informationwork/acceptancecondition")
public class AcceptanceCondition extends RevisionDomainEntity{

  private static final long serialVersionUID = 2728477543938624745L;

  private String testCaseName;

  private String testCaseNo;

  private Integer count;
  //验收结果 result {id: 'qualified', text: '合格'}, {id: 'unqualified', text: '不合格'}
  private String result;

  private Integer unqualifiedCount;

  private String mark;

  private ReceivingNote ple;

  @Column(name = "F_TESTCASENAME", length = 300)
  public String getTestCaseName() {
    return testCaseName;
  }
  public void setTestCaseName(String testCaseName) {
    this.testCaseName = testCaseName;
  }

  @Column(name = "F_TESTCASENO", length = 300)
  public String getTestCaseNo() {
    return testCaseNo;
  }
  public void setTestCaseNo(String testCaseNo) {
    this.testCaseNo = testCaseNo;
  }

  @Column(name = "F_COUNT")
  public Integer getCount() {
    return count;
  }
  public void setCount(Integer count) {
    this.count = count;
  }

  @Column(name = "F_RESULT", length = 300)
  public String getResult() {
    return result;
  }
  public void setResult(String result) {
    this.result = result;
  }

  @Column(name = "F_UNQUALIFIEDCOUNT")
  public Integer getUnqualifiedCount() {
    return unqualifiedCount;
  }
  public void setUnqualifiedCount(Integer unqualifiedCount) {
    this.unqualifiedCount = unqualifiedCount;
  }

  @Column(name = "F_MARK", length = 300)
  public String getMark(){
    return mark;
  }
  public void setMark(String mark){
    this.mark=mark;
  }

  @ManyToOne
  @JoinColumn(name="F_PLEA_ID")
  public ReceivingNote getPle() {
    return ple;
  }
  public void setPle(ReceivingNote ple) {
    this.ple = ple;
  }
}
