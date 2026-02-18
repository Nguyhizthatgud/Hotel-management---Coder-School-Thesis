"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BookPlus, ExternalLink, Search, Users, Bed } from "lucide-react";

interface EmptyStateProps {
  type?: "reservations" | "guests" | "rooms" | "general";
  onCreateNew?: () => void;
  hideTrigger?: boolean;
}

export function EmptyState({ type = "reservations", onCreateNew, hideTrigger = false }: EmptyStateProps) {
  const configs = {
    reservations: {
      icon: Calendar,
      title: "Chưa có đơn đặt phòng",
      description: "Bắt đầu bằng cách tạo đặt phòng đầu tiên hoặc kết nối với nền tảng đặt phòng",
      illustration: (
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="size-24 text-muted-foreground/20" strokeWidth={1} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-100 to-purple-100 opacity-50" />
          </div>
        </div>
      ),
      actions: [
        {
          label: "Đặt phòng trực tiếp",
          icon: BookPlus,
          variant: "default" as const,
          primary: true
        },
        {
          label: "Đến Kết nối đặt phòng",
          icon: ExternalLink,
          variant: "outline" as const,
          primary: false
        }
      ],
      suggestions: [
        {
          icon: ExternalLink,
          title: "Booking.com",
          description: "Kết nối tài khoản Booking.com của bạn để đồng bộ đặt phòng tự động"
        },
        {
          icon: ExternalLink,
          title: "Airbnb",
          description: "Nhập đặt phòng từ danh sách Airbnb của bạn"
        },
        {
          icon: ExternalLink,
          title: "Expedia",
          description: "Đồng bộ đặt phòng từ Expedia và các trang đối tác"
        },
        {
          icon: Search,
          title: "Đặt phòng trực tiếp",
          description: "Thêm khách đến trực tiếp hoặc đặt phòng qua điện thoại thủ công"
        }
      ]
    },
    guests: {
      icon: Users,
      title: "Không tìm thấy khách",
      description: "Bắt đầu bằng cách nhận khách đầu tiên hoặc thêm đặt phòng mới",
      illustration: (
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="size-24 text-muted-foreground/20" strokeWidth={1} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-green-100 to-blue-100 opacity-50" />
          </div>
        </div>
      ),
      actions: [
        {
          label: "Add Guest",
          icon: BookPlus,
          variant: "default" as const,
          primary: true
        }
      ],
      suggestions: []
    },
    rooms: {
      icon: Bed,
      title: "No Rooms Available",
      description: "Configure your hotel rooms to start managing bookings",
      illustration: (
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <Bed className="size-24 text-muted-foreground/20" strokeWidth={1} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-100 to-pink-100 opacity-50" />
          </div>
        </div>
      ),
      actions: [
        {
          label: "Add Room",
          icon: BookPlus,
          variant: "default" as const,
          primary: true
        }
      ],
      suggestions: []
    },
    general: {
      icon: Search,
      title: "No Results Found",
      description: "Try adjusting your search or filters",
      illustration: (
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="size-24 text-muted-foreground/20" strokeWidth={1} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-slate-100 opacity-50" />
          </div>
        </div>
      ),
      actions: [],
      suggestions: []
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <>
      <Card className="border-dashed border-2 bg-linear-to-br from-amber-50 via-white to-amber-50 shadow-lg rounded-lg">
        <CardContent className="pt-12 pb-12">
          {/* Illustration */}
          {config.illustration}

          {/* Title & Description */}
          <div className="text-center mb-8">
            <h3 className="text-xl mb-2">{config.title}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">{config.description}</p>
          </div>

          {/* Action Buttons */}
          {config.actions.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {config.actions.map((action, index) => {
                const ActionIcon = action.icon;
                return (
                  <Button
                    key={index}
                    variant={action.variant}
                    size="lg"
                    onClick={action.primary ? onCreateNew : undefined}
                  >
                    <ActionIcon className="size-4 mr-2" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Suggestions/Options */}
          {config.suggestions.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h4 className="text-center mb-6 text-muted-foreground italic">Các kênh đặt phòng khả dụng</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {config.suggestions.map((suggestion, index) => {
                  const SuggestionIcon = suggestion.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                        <SuggestionIcon className="size-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{suggestion.title}</div>
                        <div className="text-xs text-muted-foreground">{suggestion.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-6">
                <p className="text-xs text-muted-foreground">
                  Kết nối với các nền tảng đặt phòng để đồng bộ hóa đặt phòng tự động và quản lý hiệu quả hơn.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
