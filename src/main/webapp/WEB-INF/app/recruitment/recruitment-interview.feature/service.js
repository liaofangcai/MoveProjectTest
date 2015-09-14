var {mark} = require('cdeio/mark');

var {RecruitmentInterview}  = com.zyeeda.business.recruitment.entity;

exports.createService = function() {
  return {
    removeInterviewByResumeId: mark('managers', RecruitmentInterview).mark('tx').on(function (recruitmentInterviewMgr, recruitmentResumeId) {
      var recruitmentInterview,
        recruitmentInterviewList,i;

      recruitmentInterviewList = recruitmentInterviewMgr.getInterviewByResumeId({recruitmentResumeId: recruitmentResumeId});

      for(i = 0; i < recruitmentInterviewList.size(); i++){
        recruitmentInterview = recruitmentInterviewList.get(i);
        recruitmentInterviewMgr.remove(recruitmentInterview)
      }
    })
  };
};
