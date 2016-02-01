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
import com.zyeeda.business.informationwork.entity.AcceptanceCondition;

@Entity
@Table(name = "BZ_RECEIVING_NOTE")
@Scaffold("/informationwork/receivingnote")
public class ReceivingNote extends RevisionDomainEntity{

	private static final long serialVersionUID = 2728277543938624745L;

	private String receivingNoteNo;

	private String receivingNoteName;

	private Integer orderQuantity;

	private String inspectionBasis;

	private Date arrivalTime;
	//校验结论 testConclusion {id: 'qualified', text: '合格'}, {id: 'unqualified', text: '不合格'}
	private String testConclusion;
	//不合格处理unqualifiedDeal {'eturnGoods': '退货', i'pickingUp': '捡用', 'concessionReception': '让步接收', 'scrap': '报废' ,
	//'overAgain': '返工', 'repair': '返修'}
	private String unqualifiedDeal;

	private Date testConclusion_Date;

	private String auditor;

	private Date auditorDate;

	private String purchasingAgent;

	private String checker;

	private String charge;

	private List<AcceptanceCondition>  please;

	@NotBlank
	@Column(name = "F_RECEIVINGNOTENO", length = 300)
	public String getReceivingNoteNo() {
	      return receivingNoteNo;
	}

	public void setReceivingNoteNo(String receivingNoteNo) {
		this.receivingNoteNo = receivingNoteNo;
	}

	@NotBlank
	@Column(name = "F_RECEIVINGNAME", length = 300)
	public String getReceivingNoteName() {
		return receivingNoteName;
	}
	public void setReceivingNoteName(String receivingNoteName) {
		this.receivingNoteName = receivingNoteName;
	}

	@NotNull
	@Column(name = "F_ORDERQUANTITY")
	public Integer getOrderQuantity() {
		return orderQuantity;
	}
	public void setOrderQuantity(Integer orderQuantity) {
		this.orderQuantity = orderQuantity;
	}

	@Column(name = "F_INSPECTIONBASIS", length = 300)
	public String getInspectionBasis() {
		return inspectionBasis;
	}
	public void setInspectionBasis(String inspectionBasis) {
		this.inspectionBasis = inspectionBasis;
	}

	@Column(name = "F_ARRIVALTIME")
	@Temporal(TemporalType.DATE)
	public Date getArrivalTime() {
		return arrivalTime;
	}
	public void setArrivalTime(Date arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	@Column(name = "F_TESTCONCLUSION", length = 300)
	public String getTestConclusion() {
		return testConclusion;
	}
	public void setTestConclusion(String testConclusion) {
		this.testConclusion = testConclusion;
	}

	@Column(name = "F_UNQUALIFIEDDEAL", length = 300)
	public String getUnqualifiedDeal() {
		return unqualifiedDeal;
	}
	public void setUnqualifiedDeal(String unqualifiedDeal) {
		this.unqualifiedDeal = unqualifiedDeal;
	}

	@Temporal(TemporalType.DATE)
	@Column(name="F_TESTCONCLUSION_DATE")
	public Date getTestConclusion_Date() {
		return testConclusion_Date;
	}
	public void setTestConclusion_Date(Date testConclusion_Date) {
		this.testConclusion_Date = testConclusion_Date;
	}

	@Column(name="F_AUDITOR")
	public String getAuditor() {
		return auditor;
	}
	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}

	@Temporal(TemporalType.DATE)
	@Column(name="F_AUDITORDATE")
	public Date getAuditorDate() {
		return auditorDate;
	}
	public void setAuditorDate(Date auditorDate) {
		this.auditorDate = auditorDate;
	}

	@Column(name="F_PURCHASINGAGENT")
	public String getPurchasingAgent() {
		return purchasingAgent;
	}
	public void setPurchasingAgent(String purchasingAgent) {
		this.purchasingAgent = purchasingAgent;
	}

	@Column(name="F_CHECKER")
	public String getChecker() {
		return checker;
	}
	public void setChecker(String checker) {
		this.checker = checker;
	}

	@Column(name="F_CHARGE")
	public String getCharge() {
		return charge;
	}
	public void setCharge(String charge) {
		this.charge = charge;
	}

	@OneToMany(mappedBy="ple",fetch=FetchType.LAZY)
	public List<AcceptanceCondition> getPlease() {
		return please;
	}
	public void setPlease(List<AcceptanceCondition> please) {
		this.please = please;
	}
}
