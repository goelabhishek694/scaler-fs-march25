import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined,
} from "@ant-design/icons";


import { message, Layout, Menu } from "antd";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { CurrentUser } from "../api/users";
import { setUser } from "../../redux/userSlice";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Header, Content, Footer, Sider } = Layout;

    const navItems = [
        {
            label: "Home",
            icon: <HomeOutlined />,
        },
        {
            label: `${user ? user.name : ""}`,
            icon: <UserOutlined />,
            children: [
                {
                    label: (
                        <span
                            onClick={() => {
                                if (user.role === "admin") {
                                    navigate("/admin");
                                } else if (user.role === "partner") {
                                    navigate("/partner");
                                } else {
                                    navigate("/profile");
                                }
                            }}
                        >
                            My Profile
                        </span>
                    ),
                    icon: <ProfileOutlined />,
                },
                {
                    label: (
                        <Link
                            to="/login"
                            onClick={() => {
                                localStorage.removeItem("token");
                            }}
                        >
                            Log Out
                        </Link>
                    ),
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ];

    const getValidUser = async () => {
        try {
            dispatch(showLoading());
            const response = await CurrentUser();
            console.log(response);
            dispatch(setUser(response));
            dispatch(hideLoading());
        } catch (error) {
            dispatch(setUser(null));
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getValidUser();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        user && (
            <Layout>
                <Header
                    className="d-flex justify-content-between"
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
                        Book My Show
                    </h3>
                    <Menu theme="dark" mode="horizontal" items={navItems} />
                </Header>
                <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
                    {children}
                </div>
            </Layout>
        )
    );
};

export default ProtectedRoute;
