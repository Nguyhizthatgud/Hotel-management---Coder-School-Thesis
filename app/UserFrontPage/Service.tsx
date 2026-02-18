import React from "react";
import { Tabs, Card, Col, Row } from "antd";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { LuClockArrowUp } from "react-icons/lu";
import { TiStarOutline } from "react-icons/ti";
import Image from "next/image";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { MdMeetingRoom } from "react-icons/md";
import { MdSendToMobile } from "react-icons/md";
import { LuChartBar } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import { useTranslation } from "react-i18next";
type FieldType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  room?: string;
  acceptTerms?: boolean;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Form submitted successfully:", values);
  // Here you can handle the form submission
  // For example: send data to API, show success message, etc.
};
const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Form validation failed:", errorInfo);
};
const Service = () => {
  const { t } = useTranslation();
  return (
    <section className="">
      {/* Service Section */}
      <div className="container mx-auto h-auto py-15">
        <div className="text-center my-5">
          <p className="service-content text-4xl mt-10 mx-auto">{t("topText_service")}</p>
        </div>
        <Tabs
          defaultActiveKey="1"
          className="custom-tabs text-center"
          centered={true}
          items={[
            {
              label: <span className="tab-label">{t("slide_service1")}</span>,
              key: "1",
              children: (
                <div className="flex justify-center items-center ">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="p-15">
                      <Image
                        className="object-cover rounded-2xl w-full h-auto"
                        src="/assets/img/roomImages/2-lg.png"
                        alt="Khách sạn"
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className="p-5 m-10 text-left">
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("slide_service1_heading")}</h3>
                      <p className="text-gray-700 leading-8 mb-4 service-details">{t("slide_service1_desc")}</p>
                      <ul className="text-gray-600 space-y-2 leading-8 service-details">
                        <li>• {t("slide_service1_desc_point1")}</li>
                        <li>• {t("slide_service1_desc_point2")}</li>
                        <li>• {t("slide_service1_desc_point3")}</li>
                        <li>• {t("slide_service1_desc_point4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            {
              label: <span className="tab-label">{t("slide_service2")}</span>,
              key: "2",
              children: (
                <div className="flex justify-center items-center ">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="p-15">
                      <Image
                        className="object-cover rounded-2xl w-full h-auto"
                        src="/assets/img/roomImages/1-lg.png"
                        alt="Khách sạn 1"
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className="p-5 m-10 text-left">
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("slide_service2_heading")}</h3>
                      <p className="text-gray-700 leading-8 mb-4 service-details">{t("slide_service2_desc")}</p>
                      <ul className="text-gray-600 space-y-2 leading-8 service-details">
                        <li>• {t("slide_service2_desc_point1")}</li>
                        <li>• {t("slide_service2_desc_point2")}</li>
                        <li>• {t("slide_service2_desc_point3")}</li>
                        <li>• {t("slide_service2_desc_point4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            {
              label: <span className="tab-label text-shadow-amber-50">{t("slide_service3")}</span>,
              key: "3",
              children: (
                <div className="flex justify-center items-center ">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="p-15">
                      <Image
                        className="object-cover rounded-2xl w-full h-auto"
                        src="/assets/img/roomImages/3-lg.png"
                        alt="Khách sạn 2"
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className="p-5 m-10 text-left">
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("slide_service3_heading")}</h3>
                      <p className="text-gray-700 mb-4 leading-8 service-details">{t("slide_service3_desc")}</p>
                      <ul className="text-gray-600 space-y-2 leading-8">
                        <li>• {t("slide_service3_desc_point1")}</li>
                        <li>• {t("slide_service3_desc_point2")}</li>
                        <li>• {t("slide_service3_desc_point3")}</li>
                        <li>• {t("slide_service3_desc_point4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            {
              label: <span className="tab-label">{t("slide_service4")}</span>,
              key: "4",
              children: (
                <div className="flex justify-center items-center ">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="p-15">
                      <Image
                        className="object-cover rounded-2xl w-full h-auto"
                        src="/assets/img/roomImages/4-lg.png"
                        alt="Khách sạn 4"
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className="p-5 m-10 text-left">
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("slide_service4_heading")}</h3>
                      <p className="text-gray-700 mb-4 leading-8 service-details">{t("slide_service4_desc")}</p>
                      <ul className="text-gray-600 space-y-2 leading-8 service-details">
                        <li>• {t("slide_service4_desc_point1")}</li>
                        <li>• {t("slide_service4_desc_point2")}</li>
                        <li>• {t("slide_service4_desc_point3")}</li>
                        <li>• {t("slide_service4_desc_point4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            {
              label: <span className="tab-label">{t("slide_service5")}</span>,
              key: "5",
              children: (
                <div className="flex justify-center items-center ">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="p-15">
                      <Image
                        className="object-cover rounded-2xl w-full h-auto"
                        src="/assets/img/roomImages/5-lg.png"
                        alt="Khách sạn 5"
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className="p-5 m-10 text-left">
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("slide_service5_heading")}</h3>
                      <p className="text-gray-700 mb-4 leading-8 service-details">{t("slide_service5_desc")}</p>
                      <ul className="text-gray-600 space-y-2 leading-8 service-details">
                        <li>• {t("slide_service5_desc_point1")}</li>
                        <li>• {t("slide_service5_desc_point2")}</li>
                        <li>• {t("slide_service5_desc_point3")}</li>
                        <li>• {t("slide_service5_desc_point4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            {
              label: <span className="tab-label">{t("slide_service6")}</span>,
              key: "6",
              children: (
                <div className="flex justify-center items-center ">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="p-15">
                      <Image
                        className="object-cover rounded-2xl w-full h-auto"
                        src="/assets/img/roomImages/6-lg.png"
                        alt="Khách sạn 2"
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className="p-5 m-10 text-left">
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("slide_service6_heading")}</h3>
                      <p className="text-gray-700 leading-8 space-y-2 service-details">{t("slide_service6_desc")}</p>
                      <ul className="text-gray-600 space-y-2 leading-10 service-details">
                        <li>• {t("slide_service6_desc_point1")}</li>
                        <li>• {t("slide_service6_desc_point2")}</li>
                        <li>• {t("slide_service6_desc_point3")}</li>
                        <li>• {t("slide_service6_desc_point4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            }
          ]}
        />
      </div>
      {/* showcase Section */}
      <div className="header">
        <div className="container mx-auto py-15 text-center">
          <h2 className="service-content text-3xl font-light my-10 ">{t("showcase_service_heading")}</h2>
          <Row gutter={16}>
            <Col span={8}>
              <Card
                hoverable={true}
                title={
                  <div className="flex items-center justify-center gap-2 text-3xl p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center text-amber-600 font-bold gap-2 py-4">
                        <FaRegArrowAltCircleUp className="text-amber-600" />
                        {t("showcase_service1_title")}
                      </div>
                      <span className="text-gray-600 text-xl font-light">{t("showcase_service1_title_detail")}</span>
                    </div>
                  </div>
                }
                variant="borderless"
                className="text-center"
              >
                <div className="p-5">
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-2xl font-semibold">
                      {t("showcase_service1_title_desc")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-xl text-justify">
                      {t("showcase_service1_desc_detail")}
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable={true}
                title={
                  <div className="flex items-center justify-center gap-2 text-3xl p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center text-amber-600 font-bold gap-2 py-4">
                        <LuClockArrowUp className="text-amber-600 " />
                        {t("showcase_service2_title")}
                      </div>
                      <span className="text-gray-600 text-xl font-light">{t("showcase_service2_title_detail")}</span>
                    </div>
                  </div>
                }
                variant="borderless"
                className="text-center"
              >
                <div className="p-5">
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-2xl font-semibold">
                      {t("showcase_service2_title_desc")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-xl text-justify">
                      {t("showcase_service2_desc_detail")}
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable={true}
                title={
                  <div className="flex items-center justify-center gap-2 text-3xl p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center text-amber-600 font-bold gap-2 py-4">
                        <TiStarOutline className="text-amber-600" />
                        {t("showcase_service3_title")}
                      </div>
                      <span className="text-gray-600 text-xl font-light">{t("showcase_service3_title_detail")}</span>
                    </div>
                  </div>
                }
                variant="borderless"
                className="text-center"
              >
                <div className="p-5">
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-2xl font-semibold ">
                      {t("showcase_service3_title_desc")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-xl text-justify">
                      {t("showcase_service3_desc_detail")}
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      {/* User 30days */}
      <div className="contain">
        <div className="container mx-auto py-10">
          <div className="text-center">
            <h2 className="text-3xl font-light service-content mt-6">{t("users_trial_heading")}</h2>
            <p className="text-gray-700 leading-8 service-details mb-6">{t("Users_trial_desc")}</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="py-20 px-10 text-left">
              <div className="mb-10 bg-white rounded-lg shadow-lg p-10">
                <h3 className="text-2xl font-serif mb-4">
                  {t("Users_trial_thumbnail")}
                  <span className="text-gray-700 font-light text-sm"> - {t("Users_trial_thumbnail_desc")}</span>
                </h3>
                <div className="pl-10">
                  <p className="text-gray-700 leading-8 mb-4 service-details">
                    <span className="flex items-center font-semibold gap-2">
                      <FaChartLine /> {t("User_trial_leftside_title1")}
                    </span>
                    {t("User_trial_leftside_title1_detail")}
                  </p>
                  <p className="text-gray-700 leading-8 mb-4 service-details">
                    <span className="flex items-center font-semibold gap-2  ">
                      <LuChartBar /> {t("User_trial_leftside_title2")}
                    </span>
                    {t("User_trial_leftside_title2_detail")}
                  </p>
                  <p className="text-gray-700 leading-8 mb-4 service-details">
                    <span className="flex items-center font-semibold gap-2">
                      <MdSendToMobile /> {t("User_trial_leftside_title3")}
                    </span>
                    {t("User_trial_leftside_title3_detail")}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-10">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="mx-auto"
              >
                {/* First Name Field */}
                <Form.Item<FieldType>
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: t("User_trial_form_name_placeholder")
                    },
                    {
                      min: 2,
                      message: t("User_trial_form_name_minlength")
                    },
                    {
                      max: 50,
                      message: t("User_trial_form_name_maxlength")
                    },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message: t("User_trial_form_name_pattern")
                    }
                  ]}
                >
                  <Input
                    placeholder={t("User_trial_form_name_placeholder")}
                    className="rounded-lg"
                    prefix={<CiUser className="text-gray-400 text-xl" />}
                  />
                </Form.Item>
                {/* Last Name Field */}
                <Form.Item<FieldType>
                  name="lastName"
                  rules={[
                    { required: true, message: t("User_trial_form_lastname_placeholder") },
                    {
                      min: 2,
                      message: t("User_trial_form_lastname_minlength")
                    },
                    {
                      max: 50,
                      message: t("User_trial_form_email_maxlength")
                    },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message: t("User_trial_form_lastname_pattern")
                    }
                  ]}
                >
                  <Input
                    placeholder={t("User_trial_form_name_placeholder")}
                    className="rounded-lg"
                    prefix={<CiUser className="text-gray-400 text-xl" />}
                  />
                </Form.Item>
                {/* Email Field */}
                <Form.Item<FieldType>
                  name="email"
                  rules={[
                    { required: true, message: t("User_trial_form_email_placeholder") },
                    {
                      type: "email",
                      message: t("User_trial_form_email_invalid")
                    },
                    {
                      max: 100,
                      message: t("User_trial_form_email_maxlength")
                    }
                  ]}
                >
                  <Input
                    type="email"
                    placeholder={t("User_trial_form_email_placeholder")}
                    className="rounded-lg"
                    prefix={<MdOutlineEmail className="text-gray-400 text-xl" />}
                  />
                </Form.Item>
                <Form.Item<FieldType>
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t("User_trial_form_property_placeholder")
                    },
                    {
                      max: 30,
                      message: t("User_trial_form_property_maxlength")
                    }
                  ]}
                >
                  <Input
                    type="email"
                    placeholder={t("User_trial_form_property_placeholder")}
                    className="rounded-lg"
                    prefix={<FaHouse className="text-gray-400 text-xl" />}
                  />
                </Form.Item>
                {/* number of rooms */}
                <Form.Item<FieldType>
                  name="room"
                  rules={[
                    {
                      required: true,
                      message: t("User_trial_form_rooms_placeholder")
                    },
                    {
                      max: 4,
                      message: t("User_trial_form_rooms_placeholder_maxlength")
                    }
                  ]}
                >
                  <Input
                    type="number of room"
                    placeholder={t("User_trial_form_rooms_placeholder")}
                    className="rounded-lg"
                    prefix={<MdMeetingRoom className="text-gray-400 text-xl" />}
                  />
                </Form.Item>
                {/* Accept Terms Checkbox */}
                <Form.Item<FieldType>
                  name="acceptTerms"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      message: t("User_trial_form_accept_term_alert")
                    }
                  ]}
                >
                  <Checkbox className="text-gray-700">
                    {t("User_trial_accept_terms1")}{" "}
                    <span className="text-amber-600 hover:text-amber-700 cursor-pointer font-medium">
                      {t("User_trial_accept_terms2")}
                    </span>
                  </Checkbox>
                </Form.Item>
                {/* Submit Button */}
                <Form.Item>
                  <Button
                    htmlType="submit"
                    size="large"
                    className="w-full bg-amber-400! hover:bg-amber-600! hover:border-amber-700! rounded-lg font-semibold text-white!"
                    style={{ height: "48px" }}
                  >
                    {t("User_trial_form_submit")}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* User rating */}
      <section className="user-rating">
        <div className="container mx-auto py-25">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-light service-content mb-6">{t("user_rating_heading")}</h2>
            <p className="text-gray-700 leading-8 service-details mb-6">{t("user_rating_desc")}</p>
          </div>
          <Row gutter={16} justify="center">
            <Col span={6}>
              <Card hoverable={true} className="text-center p-5" style={{ height: "100%" }}>
                <div className="flex justify-center mb-4">
                  <Image
                    src="https://resources.littlehotelier.com/images/credibility/logo-capterra.svg"
                    width={114}
                    height={41}
                    alt="Capterra"
                  />
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-4">&quot;{t("user_rating_review1_title")}&quot;</p>
                <p className="text-gray-600 mb-4 text-left">&quot;{t("user_rating_review1")}&quot;</p>
                <p className="text-gray-500">- Nguyễn Văn A</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable={true} className="text-center p-5" style={{ height: "100%" }}>
                <div className="flex justify-center mb-4">
                  <Image
                    src="https://resources.littlehotelier.com/images/credibility/logo-software-advice.svg"
                    width={148}
                    height={41}
                    alt="Software Advice"
                  />
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-4">&quot;{t("user_rating_review2_title")}&quot;</p>
                <p className="text-gray-600 mb-4 text-left">&quot;{t("user_rating_review2")}&quot;</p>
                <p className="text-gray-500">- Trần Thị B</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable={true} className="text-center p-5" style={{ height: "100%" }}>
                <div className="flex justify-center mb-4">
                  <Image
                    src="https://resources.littlehotelier.com/images/credibility/logo-trustpilot.svg"
                    width={119}
                    height={41}
                    alt="Trustpilot"
                  />
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-4">&quot;{t("user_rating_review3_title")}&quot;</p>
                <p className="text-gray-600 mb-4 text-left">&quot;{t("user_rating_review3")}&quot;</p>
                <p className="text-gray-500">- Lê Văn C</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable={true} className="text-center p-5" style={{ height: "100%" }}>
                <div className="flex justify-center mb-4">
                  <Image
                    src="https://resources.littlehotelier.com/images/credibility/logo-hoteltechreport.svg"
                    width={127}
                    height={41}
                    alt="Hotel Tech Report"
                  />
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-4">&quot;{t("user_rating_review4_title")}&quot;</p>
                <p className="text-gray-600 mb-4 text-left">&quot;{t("user_rating_review4")}&quot;</p>
                <p className="text-gray-500">- Phạm Thị D</p>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </section>
  );
};

export default Service;
