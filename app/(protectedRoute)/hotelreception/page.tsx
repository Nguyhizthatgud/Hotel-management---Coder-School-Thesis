"use client";
import React from "react";
import { Card, Row, Col, Statistic, Table, Tag, Button, Typography, Divider, Title } from "antd";
import {
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  HomeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import type { ColumnsType } from "antd/es/table";
import Customer from "./customer";
const { Text } = Typography;

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "charge" | "payment" | "refund";
  amount: number;
  balance: number;
}

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomNumber: string;
  roomType: string;
}

interface Props {
  folioId?: string;
}

const Folio: React.FC<Props> = ({}) => {
  // Mock guest data
  const guestInfo: GuestInfo = {
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    checkIn: "2025-11-20",
    checkOut: "2025-11-25",
    roomNumber: "305",
    roomType: "Deluxe Sea View"
  };

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2025-11-20 14:00",
      description: "Room Charge - Deluxe Sea View (5 nights)",
      type: "charge",
      amount: 550.0,
      balance: 550.0
    },
    {
      id: "2",
      date: "2025-11-20 14:05",
      description: "Deposit Payment - Credit Card",
      type: "payment",
      amount: -200.0,
      balance: 350.0
    },
    {
      id: "3",
      date: "2025-11-21 09:30",
      description: "Breakfast Buffet x2",
      type: "charge",
      amount: 30.0,
      balance: 380.0
    },
    {
      id: "4",
      date: "2025-11-21 20:15",
      description: "Restaurant - Dinner",
      type: "charge",
      amount: 85.0,
      balance: 465.0
    },
    {
      id: "5",
      date: "2025-11-22 10:00",
      description: "Spa Service - Massage",
      type: "charge",
      amount: 120.0,
      balance: 585.0
    },
    {
      id: "6",
      date: "2025-11-23 08:00",
      description: "Minibar Consumption",
      type: "charge",
      amount: 25.0,
      balance: 610.0
    }
  ];

  const columns: ColumnsType<Transaction> = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: 150
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: Transaction["type"]) => {
        const config = {
          charge: { color: "red", text: "Chi phí" },
          payment: { color: "green", text: "Thanh toán" },
          refund: { color: "blue", text: "Hoàn tiền" }
        };
        return <Tag color={config[type].color}>{config[type].text}</Tag>;
      }
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      align: "right",
      render: (amount: number) => (
        <Text strong style={{ color: amount < 0 ? "#52c41a" : "#ff4d4f" }}>
          {amount < 0 ? "-" : "+"} ${Math.abs(amount).toFixed(2)}
        </Text>
      )
    },
    {
      title: "Số dư",
      dataIndex: "balance",
      key: "balance",
      width: 120,
      align: "right",
      render: (balance: number) => <Text strong>${balance.toFixed(2)}</Text>
    }
  ];

  const totalCharges = transactions.filter((t) => t.type === "charge").reduce((sum, t) => sum + t.amount, 0);

  const totalPayments = transactions
    .filter((t) => t.type === "payment")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const currentBalance = totalCharges - totalPayments;
  const nights = 5;

  return (
    <SidebarProvider className="p-6 bg-gray-50 min-h-screen">
      {/* side left */}
      <AppSidebar />
      {/* side right */}
      <SidebarInset className="w-full">
        <SiteHeader />
        {/* <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
              <Customer/> 
            </div>
          </div>
        </div> */}
      </SidebarInset>
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="mb-0">
            Guest Folio
          </Title>
          <Text type="secondary">Mã folio: {folioId}</Text>
        </div>
        <div className="flex gap-2">
          <Button icon={<EyeOutlined />}>Xem trước</Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            Xuất PDF
          </Button>
        </div>
      </div> */}

      {/* Guest Information Card */}
      <Card className="mb-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="flex items-start gap-3">
              <UserOutlined className="text-2xl text-blue-500 mt-1" />
              <div>
                <Text strong className="block">
                  Thông tin khách
                </Text>
                <Title level={4} className="mb-1">
                  {guestInfo.name}
                </Title>
                <Text type="secondary" className="block">
                  {guestInfo.email}
                </Text>
                <Text type="secondary" className="block">
                  {guestInfo.phone}
                </Text>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="flex items-start gap-3">
              <HomeOutlined className="text-2xl text-green-500 mt-1" />
              <div>
                <Text strong className="block">
                  Thông tin phòng
                </Text>
                <Title level={4} className="mb-1">
                  Phòng {guestInfo.roomNumber} - {guestInfo.roomType}
                </Title>
                <div className="flex items-center gap-2">
                  <CalendarOutlined />
                  <Text>
                    {guestInfo.checkIn} → {guestInfo.checkOut} ({nights} đêm)
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Statistics */}
      {/* <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng chi phí"
              value={totalCharges}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#ff4d4f" }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đã thanh toán"
              value={totalPayments}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#52c41a" }}
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Số dư hiện tại"
              value={currentBalance}
              precision={2}
              prefix="$"
              valueStyle={{ color: currentBalance > 0 ? "#ff4d4f" : "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Giá trung bình/đêm"
              value={totalCharges / nights}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row> */}

      {/* Transactions Table */}
      {/* <Card
        title={
          <div className="flex items-center gap-2">
            <DollarOutlined />
            <span>Chi tiết giao dịch</span>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="id"
          pagination={false}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  <Text strong>Tổng cộng</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong style={{ color: "#ff4d4f" }}>
                    +${totalCharges.toFixed(2)}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">
                  <Text strong style={{ fontSize: 16, color: currentBalance > 0 ? "#ff4d4f" : "#52c41a" }}>
                    ${currentBalance.toFixed(2)}
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />

        <Divider />
        <div className="flex justify-end gap-3 mt-4">
          <Button size="large">Thêm chi phí</Button>
          <Button size="large">Hoàn tiền</Button>
          <Button type="primary" size="large" disabled={currentBalance <= 0}>
            Thanh toán ${currentBalance.toFixed(2)}
          </Button>
        </div>
      </Card> */}

      {/* Footer Notes */}
      {/* <Card className="mt-6" size="small">
        <Text type="secondary" className="block text-center">
          Folio được tạo tự động bởi hệ thống quản lý khách sạn. Mọi thắc mắc xin liên hệ lễ tân.
        </Text>
      </Card> */}
    </SidebarProvider>
  );
};

export default Folio;
