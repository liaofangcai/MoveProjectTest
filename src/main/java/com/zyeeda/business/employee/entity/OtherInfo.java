package com.zyeeda.business.employee.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

import org.hibernate.validator.constraints.NotBlank;


@Entity
@Table(name = "bz_employee_other_info")
@Scaffold("/employee/other-info")
public class OtherInfo extends RevisionDomainEntity{
	 /**
	  * 序列化
	  */
	 private static final long serialVersionUID = 3728277543938624745L;
	 /**
	  * 项目
	  */
	 private  String project;
	 /**
	  * 内容
	  */
	 private String content;
	 /**
	  * 所属员工
	  */
	 private EmployeeInfo employeeInfo;


  @NotBlank
  @Column(name = "f_project", length = 300)
  @NullableSize(max = 166)
	public String getProject() {
		return project;
	}
	public void setProject(String project) {
		this.project = project;
	}

  @NotBlank
  @Column(name = "f_content", length = 300)
  @NullableSize(max = 166)
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

	@ManyToOne
	@JoinColumn(name = "f_employee_info" )
	public EmployeeInfo getEmployeeInfo() {
		return employeeInfo;
	}

	public void setEmployeeInfo(EmployeeInfo employeeInfo) {
		this.employeeInfo = employeeInfo;
	}

}
