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
@Table(name = "bz_receiving_note")
@Scaffold("/informationwork/receivingNote")
public class ReceivingNote extends RevisionDomainEntity{

     private static final long serialVersionUID = 2728277543938624745L;
	 private String receivingNoteNo;
	  //供应商名称
	  private String receivingNoteName;
	  //订购数量
      private Integer orderQuantity;
	  //校验依据
	  private String inspectionBasis;
	  //到货日期
	  private Date arrivalTime;
	  //检验结论
	  private String testConclusion;
	  //不合格的处理
	  private String unqualifiedDeal;

	  private String testCaseName;

	  private String testCaseNo;

	  private Integer count;

	  private String result;

	  private Integer unqualifiedCount;

	  private String mark;

      //检验结论日期
	  private Date testConclusion_Date;
      //不合格处理的审核人
      private String auditor;
      //不合格处理的日期
      private Date auditorDate;
      //采购人
      private String purchasingAgent;
      //验收人
      private String checker;
      //部门主管
      private String charge;



    @NotBlank
    @Column(name = "f_receivingNoteNo", length = 300)
	public String getReceivingNoteNo() {
		return receivingNoteNo;
	}

	public void setReceivingNoteNo(String receivingNoteNo) {
		this.receivingNoteNo = receivingNoteNo;
	}
    @NotBlank
    @Column(name = "f_receivingNoteName", length = 300)
	public String getReceivingNoteName() {
		return receivingNoteName;
	}

	public void setReceivingNoteName(String receivingNoteName) {
		this.receivingNoteName = receivingNoteName;
	}
    @NotNull
    @Column(name = "f_orderQuantity")
	public Integer getOrderQuantity() {
		return orderQuantity;
	}

	public void setOrderQuantity(Integer orderQuantity) {
		this.orderQuantity = orderQuantity;
	}

    @Column(name = "f_inspectionBasis", length = 300)
	public String getInspectionBasis() {
		return inspectionBasis;
	}

	public void setInspectionBasis(String inspectionBasis) {
		this.inspectionBasis = inspectionBasis;
	}

    @Column(name = "f_arrivalTime")
    @Temporal(TemporalType.DATE)
	public Date getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(Date arrivalTime) {
		this.arrivalTime = arrivalTime;
	}
    @NotBlank
    @Column(name = "f_testConclusion", length = 300)
	public String getTestConclusion() {
		return testConclusion;
	}

	public void setTestConclusion(String testConclusion) {
		this.testConclusion = testConclusion;
	}

    @Column(name = "f_unqualifiedDeal", length = 300)
	public String getUnqualifiedDeal() {
		return unqualifiedDeal;
	}

	public void setUnqualifiedDeal(String unqualifiedDeal) {
		this.unqualifiedDeal = unqualifiedDeal;
	}
    @NotBlank
    @Column(name = "f_testCaseName", length = 300)
	public String getTestCaseName() {
		return testCaseName;
	}

	public void setTestCaseName(String testCaseName) {
		this.testCaseName = testCaseName;
	}
    @NotBlank
    @Column(name = "f_testCaseNo", length = 300)
	public String getTestCaseNo() {
		return testCaseNo;
	}

	public void setTestCaseNo(String testCaseNo) {
		this.testCaseNo = testCaseNo;
	}
	@NotNull
    @Column(name = "f_count")
	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
    @NotBlank
    @Column(name = "f_result", length = 300)
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
    @NotNull
    @Column(name = "f_unqualifiedCount")
	public Integer getUnqualifiedCount() {
		return unqualifiedCount;
	}

	public void setUnqualifiedCount(Integer unqualifiedCount) {
		this.unqualifiedCount = unqualifiedCount;
	}

	@Column(name = "f_mark", length = 300)
	public String getMark(){
		return mark;
	}
	public void setMark(String mark){
		this.mark=mark;
	}


	@Temporal(TemporalType.DATE)
	@Column(name="f_testConclusion_Date")
	public Date getTestConclusion_Date() {
		return testConclusion_Date;
	}
	public void setTestConclusion_Date(Date testConclusion_Date) {
		this.testConclusion_Date = testConclusion_Date;
	}
	@Column(name="f_auditor")
	public String getAuditor() {
		return auditor;
	}
	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}
	@Temporal(TemporalType.DATE)
	@Column(name="f_auditorDate")
	public Date getAuditorDate() {
		return auditorDate;
	}
	public void setAuditorDate(Date auditorDate) {
		this.auditorDate = auditorDate;
	}
	@Column(name="f_purchasingAgent")
	public String getPurchasingAgent() {
		return purchasingAgent;
	}
	public void setPurchasingAgent(String purchasingAgent) {
		this.purchasingAgent = purchasingAgent;
	}
	@Column(name="f_checker")
	public String getChecker() {
		return checker;
	}
	public void setChecker(String checker) {
		this.checker = checker;
	}
	@Column(name="f_charge")
	public String getCharge() {
		return charge;
	}
	public void setCharge(String charge) {
		this.charge = charge;
	}




}
