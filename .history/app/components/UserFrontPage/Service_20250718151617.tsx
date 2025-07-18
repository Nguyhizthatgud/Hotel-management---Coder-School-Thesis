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
type Props = {
  roomId?: string;
  roomName?: string;
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Form submitted successfully:", values);
  // Here you can handle the form submission
  // For example: send data to API, show success message, etc.
};
const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Form validation failed:", errorInfo);
};
const Service = (props: Props) => {
  return (
    <section className="">
      {/* Service Section */}
      <div className="container mx-auto h-auto py-15">
        <div className="text-center my-5">
          <p className="service-content text-4xl mt-10 mx-auto">
            Danh mục phục vụ quản lý tài sản rộng khắp.
          </p>
        </div>
        <Tabs
          defaultActiveKey="1"
          className="custom-tabs text-center"
          centered={true}
          items={[
            {
              label: <span className="tab-label">Khách Sạn</span>,
              key: "1",
              children: (
                <div className="flex justify-center items-center ">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="p-15">
                      <Image
                        className="object-cover rounded-2xl w-full h-auto"
                        src="/assets/img/roomImages/2-lg.png"
                        alt="Khách sạn 2"
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className="p-5 m-10 text-left">
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">
                        Quản lý khách sạn chuyên nghiệp
                      </h3>
                      <p className="text-gray-700 leading-8 mb-4 service-details">
                        Hệ thống quản lý khách sạn toàn diện với đầy đủ tính
                        năng từ đặt phòng, check-in/out, quản lý dịch vụ đến báo
                        cáo doanh thu chi tiết. Tích hợp công nghệ hiện đại giúp
                        tối ưu hóa vận hành và nâng cao trải nghiệm khách hàng.
                      </p>
                      <ul className="text-gray-600 space-y-2 leading-8 service-details">
                        <li>• Quản lý đặt phòng trực tuyến</li>
                        <li>• Tích hợp PMS và Channel Manager</li>
                        <li>• Báo cáo doanh thu real-time</li>
                        <li>• Hỗ trợ đa ngôn ngữ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: <span className="tab-label">Nhà Nghỉ B&B</span>,
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
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">
                        Giải pháp cho nhà nghỉ B&B
                      </h3>
                      <p className="text-gray-700 leading-8 mb-4 service-details">
                        Phù hợp với các cơ sở lưu trú quy mô nhỏ. Giao diện đơn
                        giản, dễ sử dụng với các tính năng cơ bản nhưng đầy đủ
                        để quản lý hiệu quả việc kinh doanh nhà nghỉ và B&B.
                      </p>
                      <ul className="text-gray-600 space-y-2 leading-8 service-details">
                        <li>• Quản lý phòng đơn giản</li>
                        <li>• Tính năng check-in nhanh</li>
                        <li>• Theo dõi khách hàng thân thiết</li>
                        <li>• Báo cáo tài chính cơ bản</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: (
                <span className="tab-label text-shadow-amber-50">Căn Hộ</span>
              ),
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
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">
                        Quản lý căn hộ dịch vụ
                      </h3>
                      <p className="text-gray-700 mb-4 leading-8 service-details">
                        Giải pháp tối ưu cho việc quản lý căn hộ dịch vụ và cho
                        thuê ngắn hạn. Hệ thống hỗ trợ quản lý nhiều căn hộ cùng
                        lúc, tự động hóa quy trình từ đặt phòng đến thanh toán,
                        giúp tối đa hóa lợi nhuận và giảm thiểu công việc quản
                        lý thủ công.
                      </p>
                      <ul className="text-gray-600 space-y-2 leading-8">
                        <li>• Quản lý đa căn hộ trên một nền tảng</li>
                        <li>• Tích hợp với Airbnb, Booking.com</li>
                        <li>• Quản lý lịch trình dọn dẹp</li>
                        <li>• Báo cáo thu chi theo từng căn hộ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: <span className="tab-label">Biệt Thự</span>,
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
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">
                        Quản lý biệt thự cao cấp
                      </h3>
                      <p className="text-gray-700 mb-4 leading-8 service-details">
                        Giải pháp chuyên biệt cho các biệt thự nghỉ dưỡng và
                        villa cho thuê. Hệ thống tích hợp các dịch vụ concierge,
                        quản lý nhân viên, bảo trì tài sản và trải nghiệm khách
                        hàng VIP. Phù hợp cho các biệt thự đơn lẻ đến chuỗi
                        resort villa.
                      </p>
                      <ul className="text-gray-600 space-y-2 leading-8 service-details">
                        <li>• Dịch vụ concierge và butler</li>
                        <li>• Quản lý bảo trì tài sản</li>
                        <li>• Booking dài hạn và sự kiện</li>
                        <li>• Báo cáo chi phí vận hành</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: <span className="tab-label">Nhà Nguyên Căn</span>,
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
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">
                        Quản lý nhà nguyên căn
                      </h3>
                      <p className="text-gray-700 mb-4 leading-8 service-details">
                        Tối ưu cho việc cho thuê nhà nguyên căn theo ngày, tuần
                        hoặc tháng. Hệ thống hỗ trợ quản lý từ xa, theo dõi tình
                        trạng nhà cửa, lập lịch dọn dẹp và bảo trì. Tích hợp với
                        các nền tảng Airbnb, Booking.com để tối đa hóa tỷ lệ lấp
                        đầy.
                      </p>
                      <ul className="text-gray-600 space-y-2 leading-8 service-details">
                        <li>• Quản lý từ xa qua mobile app</li>
                        <li>• Lập lịch dọn dẹp tự động</li>
                        <li>• Theo dõi tiện ích và hóa đơn</li>
                        <li>• Hỗ trợ check-in self-service</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: <span className="tab-label">Homestay</span>,
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
                      <h3 className="text-2xl font-bold mb-4 text-amber-600">
                        Quản lý homestay gia đình
                      </h3>
                      <p className="text-gray-700 leading-8 space-y-2 service-details">
                        Dành riêng cho các homestay gia đình và du lịch cộng
                        đồng. Tính năng đơn giản, dễ sử dụng với focus vào trải
                        nghiệm khách hàng và văn hóa địa phương. Hỗ trợ quản lý
                        tour, hoạt động và dịch vụ ăn uống tại chỗ.
                      </p>
                      <ul className="text-gray-600 space-y-2 leading-10 service-details">
                        <li>• Quản lý tour và hoạt động</li>
                        <li>• Menu ăn uống gia đình</li>
                        <li>• Đánh giá trải nghiệm khách</li>
                        <li>• Kết nối cộng đồng địa phương</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
      {/* showcase Section */}
      <div className="header">
        <div className="container mx-auto py-15 text-center">
          <h2 className="service-content text-3xl font-light my-10 ">
            Dịch vụ của chúng tôi
          </h2>
          <Row gutter={16}>
            <Col span={8}>
              <Card
                hoverable={true}
                title={
                  <div className="flex items-center justify-center gap-2 text-3xl p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center text-amber-600 font-bold gap-2 py-4">
                        <FaRegArrowAltCircleUp className="text-amber-600" /> 63x
                      </div>
                      <span className="text-gray-600 text-xl font-light">
                        Hiệu quả đầu tư
                      </span>
                    </div>
                  </div>
                }
                variant="borderless"
                className="text-center"
              >
                <div className="p-5">
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-2xl font-semibold">
                      Đặt phòng dễ dàng
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-xl text-justify">
                      Chúng tôi cung cấp giải pháp đặt phòng trực tuyến nhanh
                      chóng và tiện lợi, giúp khách hàng dễ dàng tìm kiếm và đặt
                      phòng chỉ với vài cú nhấp chuột.
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
                        35 phút / lượt
                      </div>
                      <span className="text-gray-600 text-xl font-light">
                        tiết kiệm thời gian trên lượt booking
                      </span>
                    </div>
                  </div>
                }
                variant="borderless"
                className="text-center"
              >
                <div className="p-5">
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-2xl font-semibold">
                      Quản lý thời gian hiệu quả
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-xl text-justify">
                      Hệ thống giúp bạn tiết kiệm thời gian trong việc quản lý
                      đặt phòng, từ việc xác nhận đến xử lý yêu cầu của khách
                      hàng, giúp bạn tập trung vào các công việc quan trọng
                      khác.
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
                        Nhiều tiện ích
                      </div>
                      <span className="text-gray-600 text-xl font-light">
                        Đa dạng kênh đầu tư
                      </span>
                    </div>
                  </div>
                }
                variant="borderless"
                className="text-center"
              >
                <div className="p-5">
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-2xl font-semibold ">
                      Tích hợp nhiều tiện ích
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-8 mb-4 text-xl text-justify">
                      Chúng tôi cung cấp nhiều tiện ích tích hợp như quản lý tài
                      sản, báo cáo doanh thu và các công cụ marketing để giúp
                      bạn tối ưu hóa hoạt động kinh doanh của mình.
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
            <h2 className="text-3xl font-light service-content mt-6">
              Trải nghiệm hệ Apache - miễn phí 30 ngày
            </h2>
            <p className="text-gray-700 leading-8 service-details mb-6">
              Không hợp đồng, không ràng buộc. Dùng thử miễn phí 30 ngày để trải
              nghiệm đầy đủ tính năng của hệ thống quản lý khách sạn Apache.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="py-20 px-10 text-left">
              <div className="mb-10 bg-white rounded-lg shadow-lg p-10">
                <h3 className="text-2xl font-bold mb-4">
                  Đăng ký ngay hôm nay
                </h3>
                <div>
                  <p className="text-gray-700 leading-8 mb-4 service-details">
                    Điền thông tin bên dưới để bắt đầu dùng thử miễn phí 30 ngày
                    với hệ thống quản lý khách sạn Apache. Chúng tôi sẽ liên hệ
                    với bạn để hướng dẫn cài đặt và sử dụng.
                  </p>
                  <p className="text-gray-700 leading-8 mb-4 service-details">
                    Sau khi đăng ký, bạn sẽ nhận được email xác nhận và hướng
                    dẫn chi tiết để bắt đầu trải nghiệm hệ thống.
                  </p>
                  <p className="text-gray-700 leading-8 mb-4 service-details">
                    Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng
                    tôi qua email hoặc số điện thoại hỗ trợ. Chúng tôi luôn sẵn
                    sàng hỗ trợ bạn trong quá trình sử dụng hệ thống.
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
                      message: "Please input your first name!",
                    },
                    {
                      min: 2,
                      message: "First name must be at least 2 characters!",
                    },
                    {
                      max: 50,
                      message: "First name cannot exceed 50 characters!",
                    },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message:
                        "First name can only contain letters and spaces!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your first name"
                    className="rounded-lg"
                    prefix={<CiUser className="text-gray-400 text-xl" />}
                  />
                </Form.Item>
                {/* Last Name Field */}
                <Form.Item<FieldType>
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                    {
                      min: 2,
                      message: "Last name must be at least 2 characters!",
                    },
                    {
                      max: 50,
                      message: "Last name cannot exceed 50 characters!",
                    },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message: "Last name can only contain letters and spaces!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your last name"
                    className="rounded-lg"
                    prefix={<CiUser className="text-gray-400 text-xl" />}
                  />
                </Form.Item>
                {/* Email Field */}
                <Form.Item<FieldType>
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                    {
                      max: 100,
                      message: "Email cannot exceed 100 characters!",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="rounded-lg"
                    prefix={
                      <MdOutlineEmail className="text-gray-400 text-xl" />
                    }
                  />
                </Form.Item>
                <Form.Item<FieldType>
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company name!",
                    },
                    {
                      max: 30,
                      message: "Company name cannot exceed 30 characters!",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Enter your company name"
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
                      message:
                        "Please enter the number of rooms (max 4-digits)!",
                    },
                    {
                      max: 4,
                      message: "Number of room cannot exceed 4 characters!",
                    },
                  ]}
                >
                  <Input
                    type="number of room"
                    placeholder="Enter the number of rooms"
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
                      message:
                        "You must accept the Apache content terms to continue!",
                    },
                  ]}
                >
                  <Checkbox className="text-gray-700">
                    I accept the{" "}
                    <span className="text-amber-600 hover:text-amber-700 cursor-pointer font-medium">
                      Apache content terms and conditions
                    </span>
                  </Checkbox>
                </Form.Item>
                {/* Submit Button */}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full bg-amber-600 hover:bg-amber-700 border-amber-600 hover:border-amber-700 rounded-lg font-semibold text-white"
                    style={{ height: "48px" }}
                  >
                    Try Free for 30 Days
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* User rating */}
      <div>
        <div className="container mx-auto py-10">
          <h2 className="text-3xl font-bold text-center mb-6 service-content">
            Đánh giá của người dùng
          </h2>
          <p className="text-gray-700 text-center mb-4">
            Chúng tôi tự hào nhận được những đánh giá tích cực từ người dùng về
            dịch vụ của mình.
          </p>
          <div className="flex justify-center"></div>
        </div>
      </div>
    </section>
  );
};

export default Service;
