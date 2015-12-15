package com.zyeeda.business.experiment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
/**
 * 系统上线申请表
 * @author child
 *
 */
@Entity
@Table(name="bz_information_system")
@Scaffold("experiment/Informationsystem")
public class InformationSystem extends RevisionDomainEntity{
	  /**
	  * 
	  */
	  private static final long serialVersionUID = 1L;
	  /**
	   * 编号
	   */
      private String in_sys_no;
      /**
       * 申请日期
       */
      private Date aplicationdate; 
      /**
       * 信息系统名称
       */
      private String in_sys_name;
      /**
       * 系统情况说明
       */
      private String sys_condition;
      /**
       * 是否完成测试
       */
      private  String complete_test;
      /**
       * 测试情况
       */
      private String test_condition;
      /**
       * 上线是否涉及其他系统
       */
      private String relate_sys;
      /**
       *备注
       */
      private String comments;
      /**
       * 申请人
       */
      private String aplicationperson;
      /**
       * 申请部门
       */
      private String aplicationdept;
      /**
       * 部门主管意见
       */
      private String dept_director;
      /**
       * 部门主管审批日期
       */
      private Date dept_date;
      /**
       * 实施部门意见
       */
      private String implement_dept;
      /**
       * 实施日期
       */
      private Date implement_date;
      /**
       * 公司领导审批
       */
      private String corportionlead;
      /**
       * 公司领导审批日期
       */
      private Date corportiondate;
      
      @NotBlank
      @Column(name="in_sys_no",length=300)
      @NullableSize(max=166)
	  public String getIn_sys_no() {
		return in_sys_no;
	  }
	  public void setIn_sys_no(String in_sys_no) {
		this.in_sys_no = in_sys_no;
	  }
	  
	  @Column(name="aplication_date",length=300)
	  @JsonFormat(pattern="yyyy-MM-dd")
	  @NullableSize(max=166)
	  public Date getAplicationdate() {
		return aplicationdate;
	  }
	  public void setAplicationdate(Date aplicationdate) {
		this.aplicationdate = aplicationdate;
	  }
	  
	  @Column(name="in_sys_name",length=300)
	  @NullableSize(max=166)
	  public String getIn_sys_name() {
		return in_sys_name;
	  }
	  public void setIn_sys_name(String in_sys_name) {
		this.in_sys_name = in_sys_name;
	  }
	  
	  @Column(name="sys_condition",length=300)
	  @NullableSize(max=166)
	  public String getSys_condition() {
		return sys_condition;
	  }
	  public void setSys_condition(String sys_condition) {
		this.sys_condition = sys_condition;
	  }
	  
	  @Column(name="complete_test",length=300)
	  @NullableSize(max=166)
	  public String getComplete_test() {
		return complete_test;
	  }
	 public void setComplete_test(String complete_test) {
		this.complete_test = complete_test;
	  }
	 
	 @Column(name="test_condition",length=300)
	 @NullableSize(max=166)
	 public String getTest_condition() {
		return test_condition;
	 }
	 public void setTest_condition(String test_condition) {
		this.test_condition = test_condition;
	 }
	 
	 @Column(name="relate_sys",length=33)
	 @NullableSize(max=166)
	 public String getRelate_sys() {
		return relate_sys;
	 }
	 public void setRelate_sys(String relate_sys) {
		this.relate_sys = relate_sys;
	 }
	 
	 @Column(name="comments",length=300)
	 @NullableSize(max=166)
	 public String getComments() {
		return comments;
	 }
	 public void setComments(String comments) {
		this.comments = comments;
	 }
	 
	 @Column(name="aplicetion_person",length=300)
	 @NullableSize(max=166)
	 public String getAplicationperson() {
		return aplicationperson;
	 }
	 public void setAplicationperson(String aplicationperson) {
		this.aplicationperson = aplicationperson;
	 }
	 
	 @Column(name="aplication_dept",length=300)
	 @NullableSize(max=166)
	 public String getAplicationdept() {
		return aplicationdept;
	 }
	 public void setAplicationdept(String aplicationdept) {
		this.aplicationdept = aplicationdept;
	 }
	 
	 @Column(name="dept_director",length=300)
     @NullableSize(max=166)
	 public String getDept_director() {
		return dept_director;
	 }
	 public void setDept_director(String dept_director) {
		this.dept_director = dept_director;
	 }
	
	 @Column(name="dept_date",length=300)
	 @NullableSize(max=166)
	 public Date getDept_date() {
		return dept_date;
	 }
	 public void setDept_date(Date dept_date) {
		this.dept_date = dept_date;
	 }
	
	 @Column(name="implement_dept",length=300)
	 @NullableSize(max=166)
	 public String getImplement_dept() {
		return implement_dept;
	 }
	 public void setImplement_dept(String implement_dept) {
		this.implement_dept = implement_dept;
	 }
	
	 @Column(name="implement_date",length=300)
	 @JsonFormat(pattern="yyyy-MM-dd")
	 @NullableSize(max=166)
	 public Date getImplement_date() {
		return implement_date;
	 }
	 public void setImplement_date(Date implement_date) {
	 	this.implement_date = implement_date;
	 }
	
	 @Column(name="corportionlead",length=300)
	 @NullableSize(max=166)
	 public String getCorportionlead() {
		return corportionlead;
	 }
	 public void setCorportionlead(String corportionlead) {
		this.corportionlead = corportionlead;
	 }
	
	
	@Column(name="corportiondate",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=166)
	public Date getCorportiondate() {
		return corportiondate;
	}
	public void setCorportiondate(Date corportiondate) {
		this.corportiondate = corportiondate;
	}
      
}
