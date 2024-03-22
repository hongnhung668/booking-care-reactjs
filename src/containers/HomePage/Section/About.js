import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        
        return (
            <div className='section-share section-about'>
               <div className='section-about-header'>
                    Truyền thông nói về chanel Lee Gin
               </div>
               <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/G9DNCVu3MoU" title="THIÊN HÀ NGOÀI TẦM VỚI [梦的地方 - 纯音乐] - Hay nhất mọi thời đại" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            BookingCare là một hệ thống đặt lịch khám giúp người bệnh dễ dàng lựa chọn bác sĩ chuyên khoa phù hợp dựa trên mạng lưới các bác sĩ chuyên khoa, thông tin được xác thực rõ ràng, minh bạch hóa các thông tin liên quan đến hoạt động khám chữa bệnh: thời gian, quy trình, giá cả dịch vụ, trang thiết bị, bảo hiểm, địa chỉ, kinh nghiệm, đào tạo của bác sĩ…
                        </p>
                    </div>
               </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
