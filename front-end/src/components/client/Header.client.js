import { Link } from "react-router-dom";
import { logoMain } from "../../assets/images";
import { Header } from "antd/es/layout/layout";
import { Button, Space } from "antd";
function HeaderClient() {
    return (
        <Header className="header-client">
            <Link to="/">
                <div className="header-client__left">
                    <img
                        className="header-client__left__header-logo"
                        src={logoMain}
                        alt=""
                    />
                </div>
            </Link>
            <div className="header-client__right">
                <Space size={14}>
                    <Link to="/host/overview" target="_blank">
                        <Button
                            className="header-client__right__btn-host"
                            size="large"
                        >
                            Đăng ký cho thuê khách sạn
                        </Button>
                    </Link>
                    <Link to="/signin">
                        <Button
                            className="header-client__right__btn-signin"
                            size="large"
                        >
                            Đăng nhập
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button
                            className="header-client__right__btn-signup"
                            size="large"
                        >
                            Tạo tài khoản
                        </Button>
                    </Link>
                </Space>
            </div>
        </Header>
    );
}

export default HeaderClient;
