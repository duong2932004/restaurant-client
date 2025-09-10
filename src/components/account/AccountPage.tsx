"use client";

import { useCurrentUser, useLogout } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Separator,
  LoadingContainer,
} from "@/components/ui";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function AccountPage() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const { showToast } = useToast();
  const logoutMutation = useLogout();
  const [isEditing, setIsEditing] = useState(false);

  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone is required" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const tBar = useTranslations("account.attributeBar");
  const t = useTranslations("account.page");
  const tAuth = useTranslations("auth");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <LoadingContainer />
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

  const handleSaveProfile = async (data: FormData) => {
    // setIsEditing(false);
    
    console.log(data);

    showToast("Thành công!", "Thông tin tài khoản đã được cập nhật", "success");
  };

  const handleLogout = () => {
    logoutMutation.mutate(tAuth);
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
              <span>{isEditing ? t("cancel") : t("edit")}</span>
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
              <span>{tBar("personalInformation")}</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>{tBar("order")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center space-x-2"
            >
              <Heart className="h-4 w-4" />
              <span>{tBar("favourite")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>{tBar("settings")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("basicInfoTitle")}</CardTitle>
                  <CardDescription>{t("basicInfoDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit(handleSaveProfile)}>
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        defaultValue={user.name}
                        disabled={!isEditing}
                        className={isEditing ? "" : "bg-gray-50"}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        {...register("email")}
                        type="email"
                        defaultValue={user.email}
                        disabled={!isEditing}
                        className={isEditing ? "" : "bg-gray-50"}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor="phone">{t("phone")}</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        defaultValue={user.phone || ""}
                        placeholder={t("phonePlaceholder")}
                        disabled={!isEditing}
                        className={isEditing ? "" : "bg-gray-50"}
                      />
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2 pt-4">
                        <Button type="submit" className="flex-1">
                          {t("saveChanges")}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="flex-1"
                        >
                          {t("cancel")}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("addressesTitle")}</CardTitle>
                  <CardDescription>{t("addressesDesc")}</CardDescription>
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
                              <Badge variant="secondary">{t("default")}</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>{t("noAddress")}</p>
                      <Button variant="outline" className="mt-2">
                        {t("addAddress")}
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
                <CardTitle>{t("ordersTitle")}</CardTitle>
                <CardDescription>{t("ordersDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">{t("noOrders")}</p>
                  <p className="text-sm">{t("ordersHint")}</p>
                  <Button className="mt-4">{t("orderNow")}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>{t("favoritesTitle")}</CardTitle>
                <CardDescription>{t("favoritesDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">{t("noFavorites")}</p>
                  <p className="text-sm">{t("favoritesHint")}</p>
                  <Button className="mt-4">{t("exploreMenu")}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settingsTitle")}</CardTitle>
                  <CardDescription>{t("settingsDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{t("emailNotif")}</h3>
                      <p className="text-sm text-gray-600">
                        {t("emailNotifDesc")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("turnOn")}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{t("promoNotif")}</h3>
                      <p className="text-sm text-gray-600">
                        {t("promoNotifDesc")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("turnOff")}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                    <div>
                      <h3 className="font-medium text-red-900">
                        {t("logoutTitle")}
                      </h3>
                      <p className="text-sm text-red-600">{t("logoutDesc")}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleLogout}
                      className="flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("logoutButton")}</span>
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
