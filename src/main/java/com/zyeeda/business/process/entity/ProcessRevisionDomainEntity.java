package com.zyeeda.business.process.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

/**
 * 流程基类实体
 *
 * $Author$
 */
@MappedSuperclass
public class ProcessRevisionDomainEntity extends RevisionDomainEntity {

	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 7631825308655965760L;

	/**
	 * 流程状态(-2 : 审批完成, -1: 退回, 空或0: 初始, 其它: 审批中)
	 */
	private String flowStatus;

	/**
	 * 审批结果(1:同意,2:不同意)
	 */
	private String flowComment;

	/**
	 * 审批意见
	 */
	private String flowSuggestion;

	@Column(name = "F_FLOW_STATUS", length = 500)
	@NullableSize(max = 166)
	public String getFlowStatus() {
		return flowStatus;
	}

	public void setFlowStatus(String flowStatus) {
		this.flowStatus = flowStatus;
	}

	@Transient
	public String getFlowComment() {
		return flowComment;
	}

	public void setFlowComment(String flowComment) {
		this.flowComment = flowComment;
	}

	@Transient
	public String getFlowSuggestion() {
		return flowSuggestion;
	}

	public void setFlowSuggestion(String flowSuggestion) {
		this.flowSuggestion = flowSuggestion;
	}
}
