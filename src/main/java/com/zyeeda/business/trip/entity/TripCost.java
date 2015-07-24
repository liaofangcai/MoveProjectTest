package com.zyeeda.business.trip.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.business.process.entity.ProcessRevisionDomainEntity;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

/**
 * 行程及差旅费报销明细表
 *
 * $Author$
 */
@Entity
@Table(name = "BZ_TRIP_COST")
@Scaffold("/trip/trip-cost")
public class TripCost extends ProcessRevisionDomainEntity {

    /**
     * 出差任务报告书
     */
    private TripReport tripReport;

    /**
     * 出差日期
     */
    private Date tripTime;

    /**
     * 出差地点
     */
    private String tripPlace;

    /**
     * 交通费
     */
    private Double trafficCost;

    /**
     * 住宿费
     */
    private Double stayCost;

    /**
     * 业务招待费
     */
    private Double entertainCost;

    /**
     * 其它费用
     */
    private Double otherCost;

    /**
     * 合计金额
     */
    private Double totalCost;

    /**
     * 备注
     */
    private String remark;

    @ManyToOne
    @JoinColumn(name = "F_TRIP_REPORT_ID")
    public TripReport getTripReport() {
        return tripReport;
    }

    public void setTripReport(TripReport tripReport) {
        this.tripReport = tripReport;
    }

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "F_TRIP_TIME")
    public Date getTripTime() {
        return tripTime;
    }

    public void setTripTime(Date tripTime) {
        this.tripTime = tripTime;
    }

    @Column(name = "F_TRAFFIC_COST", length = 20)
    @Min(value= 0)
    public Double getTrafficCost() {
        return trafficCost;
    }

    public void setTrafficCost(Double trafficCost) {
        this.trafficCost = trafficCost;
    }

    @Column(name = "F_ENTERTAIN_COST", length = 20)
    @Min(value= 0)
    public Double getEntertainCost() {
        return entertainCost;
    }

    public void setEntertainCost(Double entertainCost) {
        this.entertainCost = entertainCost;
    }

    @Column(name = "F_STAY_COST", length = 20)
    @Min(value= 0)
    public Double getStayCost() {
        return stayCost;
    }

    public void setStayCost(Double stayCost) {
        this.stayCost = stayCost;
    }

    @Column(name = "F_OTHER_COST", length = 20)
    @Min(value= 0)
    public Double getOtherCost() {
        return otherCost;
    }

    public void setOtherCost(Double otherCost) {
        this.otherCost = otherCost;
    }

    @Column(name = "F_TOTAL_COST", length = 20)
    @Min(value= 0)
    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    @Column(name = "F_REMARK", length = 300)
    @NullableSize(max = 166)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

}
