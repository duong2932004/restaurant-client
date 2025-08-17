"use client";

import { useCurrentUser, useLogout } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  ShoppingBag,
  Heart,
  LogOut,
  Edit3,
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const { showToast } = useToast();
  const logoutMutation = useLogout();
  const [isEditing, setIsEditing] = useState(false);

  const t = useTranslations();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    console.log("user", user);

    return null;
  }

  const handleSaveProfile = () => {
    setIsEditing(false);
    showToast("Thành công!", "Thông tin tài khoản đã được cập nhật", "success");
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-10 max-w-6xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-xl font-semibold">
                {user.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <Badge
                  variant={user.role === "admin" ? "destructive" : "secondary"}
                >
                  {user.role}
                </Badge>
              </div>
              <p className="text-gray-600 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {user.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditing ? "Hủy" : "Chỉnh sửa"}</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Thông tin cá nhân</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Đơn hàng</span>
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center space-x-2"
            >
              <Heart className="h-4 w-4" />
              <span>Yêu thích</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Cài đặt</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                  <CardDescription>
                    Quản lý thông tin cá nhân của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      defaultValue={user.name}
                      disabled={!isEditing}
                      className={isEditing ? "" : "bg-gray-50"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      disabled={!isEditing}
                      className={isEditing ? "" : "bg-gray-50"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      defaultValue={user.phone || ""}
                      placeholder="Nhập số điện thoại"
                      disabled={!isEditing}
                      className={isEditing ? "" : "bg-gray-50"}
                    />
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleSaveProfile} className="flex-1">
                        Lưu thay đổi
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Hủy
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Địa chỉ</CardTitle>
                  <CardDescription>Quản lý địa chỉ giao hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  {user.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-3">
                      {user.addresses.map((address, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{address.name}</p>
                              <p className="text-sm text-gray-600 flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {address.address}
                              </p>
                            </div>
                            {address.isDefault && (
                              <Badge variant="secondary">Mặc định</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Chưa có địa chỉ nào</p>
                      <Button variant="outline" className="mt-2">
                        Thêm địa chỉ
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đơn hàng</CardTitle>
                <CardDescription>Xem tất cả đơn hàng của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">
                    Chưa có đơn hàng nào
                  </p>
                  <p className="text-sm">Hãy đặt món ngon đầu tiên của bạn!</p>
                  <Button className="mt-4">Đặt hàng ngay</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Món ăn yêu thích</CardTitle>
                <CardDescription>Những món ăn bạn đã yêu thích</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">
                    Chưa có món yêu thích
                  </p>
                  <p className="text-sm">
                    Thêm các món ăn vào danh sách yêu thích
                  </p>
                  <Button className="mt-4">Khám phá menu</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt tài khoản</CardTitle>
                  <CardDescription>Quản lý tùy chọn tài khoản</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Thông báo email</h3>
                      <p className="text-sm text-gray-600">
                        Nhận thông báo về đơn hàng qua email
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Bật
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Thông báo khuyến mãi</h3>
                      <p className="text-sm text-gray-600">
                        Nhận thông tin về ưu đãi và khuyến mãi
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Tắt
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                    <div>
                      <h3 className="font-medium text-red-900">Đăng xuất</h3>
                      <p className="text-sm text-red-600">
                        Đăng xuất khỏi tài khoản
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleLogout}
                      className="flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
