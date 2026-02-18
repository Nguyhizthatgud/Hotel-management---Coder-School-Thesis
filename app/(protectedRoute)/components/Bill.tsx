import { Bookings } from "@/types/booking";
import { Transaction, TransactionDescription } from "@/types/transaction";
import { useTransactionStore } from "@/stores/useTransaction";
import React from "react";

type BillProps = {
  invoice: Bookings;
  transaction?: Transaction;
};

const Bill = ({ invoice, transaction }: BillProps) => {
  // Parse transaction description if available
  const transactionDetails = React.useMemo<TransactionDescription | null>(() => {
    if (!transaction?.description) return null;
    try {
      return JSON.parse(transaction.description);
    } catch {
      return null;
    }
  }, [transaction]);
  const { getTransactionById } = useTransactionStore();

  const nights = React.useMemo(() => {
    return Math.ceil(
      (new Date(invoice.checkOutDate).getTime() - new Date(invoice.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
    );
  }, [invoice.checkInDate, invoice.checkOutDate]);

  return (
    <div className="space-y-6">
      {/* Header */}

      {/* Invoice Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">HÓA ĐƠN THANH TOÁN</h2>
        {transaction && <p className="text-lg font-semibold mt-2">{transaction.invoiceId}</p>}
        <p className="text-sm text-gray-600">
          Ngày:{" "}
          {transaction
            ? new Date(transaction.date).toLocaleDateString("vi-VN")
            : new Date().toLocaleDateString("vi-VN")}
        </p>
        {transaction && <p className="text-xs text-gray-500">Giờ: {transaction.time}</p>}
      </div>

      {/* Customer & Booking Info */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-sm mb-2 text-gray-700">THÔNG TIN KHÁCH HÀNG</h3>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Họ tên:</strong> {invoice.guestName}
            </p>
            <p>
              <strong>Điện thoại:</strong> {invoice.guestNumber}
            </p>
            {invoice.guestEmail && (
              <p>
                <strong>Email:</strong> {invoice.guestEmail}
              </p>
            )}
            {invoice.residenceRegistrationInfo?.registrationStatus === "registered" && (
              <p>
                <strong>Địa chỉ:</strong> {invoice.residenceRegistrationInfo.residenceAddress}
              </p>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-2 text-gray-700">THÔNG TIN ĐẶT PHÒNG</h3>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Số phòng:</strong> {invoice.roomNumber}
            </p>
            <p>
              <strong>Nhận phòng:</strong> {new Date(invoice.checkInDate).toLocaleDateString("vi-VN")}
            </p>
            <p>
              <strong>Trả phòng:</strong> {new Date(invoice.checkOutDate).toLocaleDateString("vi-VN")}
            </p>
            <p>
              <strong>Số đêm:</strong> {nights} đêm
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm">Dịch vụ</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm">SL</th>
              <th className="border border-gray-300 px-4 py-2 text-right text-sm">Đơn giá</th>
              <th className="border border-gray-300 px-4 py-2 text-right text-sm">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {/* Room charge */}
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                Tiền phòng {invoice.roomType} - {invoice.roomNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center text-sm">{nights}</td>
              <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                {new Intl.NumberFormat("vi-VN").format(invoice.roomPrice || 0)}đ
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                {new Intl.NumberFormat("vi-VN").format(
                  transactionDetails?.reservationTotalPrice || invoice.totalPrice || 0
                )}
                đ
              </td>
            </tr>
            {/* Service items from transaction */}
            {transactionDetails?.items &&
              Array.isArray(transactionDetails.items) &&
              transactionDetails.items.length > 0 &&
              transactionDetails.items.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-sm">1</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                    {new Intl.NumberFormat("vi-VN").format(item.unitPrice)}đ
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                    {new Intl.NumberFormat("vi-VN").format(item.total)}đ
                  </td>
                </tr>
              ))}
            {/* Subtotal for services */}

            <tr className="bg-gray-50 font-semibold">
              <td colSpan={3} className="border border-gray-300 px-4 py-2 text-right text-sm">
                Tổng dịch vụ:
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                {new Intl.NumberFormat("vi-VN").format(transactionDetails?.serviceTotal || 0)}đ
              </td>
            </tr>

            {/* Discount row */}
            {transactionDetails &&
              transactionDetails.discountAmount !== undefined &&
              transactionDetails.discountAmount > 0 && (
                <tr className="bg-red-50 font-semibold">
                  <td colSpan={3} className="border border-gray-300 px-4 py-2 text-right text-sm">
                    Chiết khấu:
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-sm text-red-600">
                    -{new Intl.NumberFormat("vi-VN").format(transactionDetails.discountAmount)}đ
                  </td>
                </tr>
              )}
            {/* Tax row */}
            {transactionDetails && transactionDetails.taxAmount !== undefined && transactionDetails.taxAmount > 0 && (
              <tr className="bg-blue-50 font-semibold">
                <td colSpan={3} className="border border-gray-300 px-4 py-2 text-right text-sm">
                  Thuế VAT (10%):
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                  {new Intl.NumberFormat("vi-VN").format(transactionDetails.taxAmount)}đ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-1/2 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tạm tính:</span>
            <span>
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                (transactionDetails?.reservationTotalPrice || invoice.totalPrice || 0) +
                  (transactionDetails?.serviceTotal || 0)
              )}
            </span>
          </div>
          {transactionDetails?.discountAmount && transactionDetails.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-red-600">
              <span>Chiết khấu:</span>
              <span>
                -
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                  transactionDetails.discountAmount
                )}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Thuế VAT (10%):</span>
            <span>
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                transactionDetails?.taxAmount || 0
              )}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t-2 border-gray-300 pt-2">
            <span>TỔNG CỘNG:</span>
            <span className="text-blue-600">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                transaction?.amount || invoice.totalPrice || 0
              )}
            </span>
          </div>
          {transaction && (
            <div className="flex justify-between text-sm text-gray-600 border-t pt-2">
              <span>Phương thức thanh toán:</span>
              <span className="capitalize">
                {transaction.paymentMethod === "cash"
                  ? "Tiền mặt"
                  : transaction.paymentMethod === "credit-card"
                    ? "Thẻ tín dụng"
                    : "Chuyển khoản"}
              </span>
            </div>
          )}
          {/* Cash payment details */}
          {transactionDetails?.amountReceived && transactionDetails.amountReceived > 0 && (
            <>
              <div className="flex justify-between text-sm bg-gray-50 px-2 py-2 rounded border">
                <span>Tiền nhận:</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    transactionDetails.amountReceived
                  )}
                </span>
              </div>
              {transactionDetails.charger && transactionDetails.charger > 0 && (
                <div className="flex justify-between text-sm bg-green-50 px-2 py-2 rounded border border-green-200">
                  <span>Tiền thối lại:</span>
                  <span className="font-semibold text-green-600">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      transactionDetails.charger
                    )}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Notes */}
      {invoice.description && (
        <div className="text-sm">
          <p>
            <strong>Ghi chú:</strong> {invoice.description}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="border-t-2 border-gray-300 pt-6 mt-8">
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <p className="text-sm font-semibold mb-8">NGƯỜI LẬP PHIẾU</p>
            <p className="text-sm">(Ký và ghi rõ họ tên)</p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-8">KHÁCH HÀNG</p>
            <p className="text-sm">(Ký và ghi rõ họ tên)</p>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-gray-600">
          <p>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
          <p>Hóa đơn này được in tự động từ hệ thống</p>
        </div>
      </div>
    </div>
  );
};

export default Bill;
