import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const activityData = [
  { day: 'Пн', downloads: 245, users: 189 },
  { day: 'Вт', downloads: 312, users: 221 },
  { day: 'Ср', downloads: 428, users: 298 },
  { day: 'Чт', downloads: 389, users: 267 },
  { day: 'Пт', downloads: 521, users: 345 },
  { day: 'Сб', downloads: 678, users: 412 },
  { day: 'Вс', downloads: 734, users: 489 },
];

const contentTypeData = [
  { name: 'Видео', value: 58, color: '#9b87f5' },
  { name: 'Фото', value: 32, color: '#0EA5E9' },
  { name: 'Истории', value: 10, color: '#2DD4BF' },
];

const suspiciousUsers = [
  { id: 1, username: '@user_bot_123', risk: 92, activity: 'Аномальная активность', lastSeen: '2 мин назад' },
  { id: 2, username: '@fake_profile_456', risk: 87, activity: 'Массовые запросы', lastSeen: '15 мин назад' },
  { id: 3, username: '@scam_alert_789', risk: 78, activity: 'Подозрительный паттерн', lastSeen: '1 час назад' },
  { id: 4, username: '@bot_detector_321', risk: 65, activity: 'Частые запросы', lastSeen: '3 часа назад' },
];

const recentLogs = [
  { time: '14:23:15', user: '@realuser', action: 'Скачивание видео', status: 'success' },
  { time: '14:22:48', user: '@testuser', action: 'Просмотр истории', status: 'success' },
  { time: '14:21:32', user: '@bot_123', action: 'Массовый запрос', status: 'blocked' },
  { time: '14:20:15', user: '@newuser', action: 'Анализ профиля', status: 'success' },
  { time: '14:19:42', user: '@scammer', action: 'Попытка доступа', status: 'blocked' },
];

export default function Index() {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Icon name="Bot" size={36} className="text-primary" />
              Telegram Bot Admin
            </h1>
            <p className="text-muted-foreground mt-1">Панель управления и аналитики</p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            Бот активен
          </Badge>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Статистика</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Пользователи</span>
            </TabsTrigger>
            <TabsTrigger value="detection" className="gap-2">
              <Icon name="Shield" size={16} />
              <span className="hidden sm:inline">Детекция</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="gap-2">
              <Icon name="ScrollText" size={16} />
              <span className="hidden sm:inline">Логи</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Settings" size={16} />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
                  <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon name="TrendingUp" size={12} className="text-green-500" />
                    <span className="text-green-500">+12.5%</span> за неделю
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Скачиваний</CardTitle>
                  <Icon name="Download" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,234</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon name="TrendingUp" size={12} className="text-green-500" />
                    <span className="text-green-500">+23.1%</span> за неделю
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:border-destructive/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Подозрительных</CardTitle>
                  <Icon name="AlertTriangle" className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">127</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon name="TrendingDown" size={12} className="text-red-500" />
                    <span className="text-red-500">-8.2%</span> за неделю
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:border-secondary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активных сейчас</CardTitle>
                  <Icon name="Activity" className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    В реальном времени
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Активность за неделю</CardTitle>
                  <CardDescription>Статистика скачиваний и активных пользователей</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line type="monotone" dataKey="downloads" stroke="#9b87f5" strokeWidth={2} />
                      <Line type="monotone" dataKey="users" stroke="#0EA5E9" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Типы контента</CardTitle>
                  <CardDescription>Распределение скачиваемого контента</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={contentTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contentTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>Список активных пользователей и их статистика</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/20 text-primary">U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">@user_{1000 + i}</p>
                          <p className="text-sm text-muted-foreground">ID: {1234567 + i}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-medium">{Math.floor(Math.random() * 100 + 20)} скачиваний</p>
                          <p className="text-xs text-muted-foreground">Активен сегодня</p>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                          Активен
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detection" className="space-y-6">
            <Card className="bg-card border-border border-destructive/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Shield" className="text-destructive" />
                      Система детекции ботов и скамеров
                    </CardTitle>
                    <CardDescription>Автоматический анализ поведения пользователей</CardDescription>
                  </div>
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    {suspiciousUsers.length} угроз
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {suspiciousUsers.map((user) => (
                      <Card key={user.id} className="bg-muted/50 border-destructive/30">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="border-2 border-destructive">
                                  <AvatarFallback className="bg-destructive/20 text-destructive">
                                    <Icon name="UserX" size={20} />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-lg">{user.username}</p>
                                  <p className="text-sm text-muted-foreground">{user.lastSeen}</p>
                                </div>
                              </div>
                              <Badge
                                variant="destructive"
                                className="text-base px-3 py-1"
                              >
                                Риск: {user.risk}%
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Уровень угрозы</span>
                                <span className="font-medium">{user.risk > 80 ? 'Критический' : 'Высокий'}</span>
                              </div>
                              <Progress value={user.risk} className="h-2" />
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="AlertCircle" size={16} className="text-destructive" />
                              <span className="text-muted-foreground">{user.activity}</span>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button size="sm" variant="destructive" className="flex-1">
                                <Icon name="Ban" size={16} className="mr-2" />
                                Заблокировать
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Icon name="Eye" size={16} className="mr-2" />
                                Подробнее
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ScrollText" />
                  Логи активности
                </CardTitle>
                <CardDescription>История действий пользователей в реальном времени</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {recentLogs.map((log, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-muted-foreground w-20">{log.time}</span>
                          <span className="font-medium">{log.user}</span>
                          <span className="text-sm text-muted-foreground">{log.action}</span>
                        </div>
                        <Badge
                          variant={log.status === 'success' ? 'outline' : 'destructive'}
                          className={log.status === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/30' : ''}
                        >
                          {log.status === 'success' ? 'Выполнено' : 'Заблокировано'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Лимиты и ограничения</CardTitle>
                <CardDescription>Настройка ограничений для пользователей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Максимум скачиваний в день</p>
                      <p className="text-sm text-muted-foreground">Для обычных пользователей</p>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2">50</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Время между запросами</p>
                      <p className="text-sm text-muted-foreground">Минимальная задержка</p>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2">5 сек</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Порог детекции ботов</p>
                      <p className="text-sm text-muted-foreground">Процент подозрительности</p>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2">75%</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Автоблокировка</p>
                      <p className="text-sm text-muted-foreground">При превышении порога</p>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                      Включена
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Настройки бота</CardTitle>
                <CardDescription>Основные параметры Telegram бота</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Icon name="Bot" className="text-primary" />
                    <div>
                      <p className="font-medium">Статус бота</p>
                      <p className="text-sm text-muted-foreground">Telegram API</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                    Активен
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Icon name="Key" className="text-primary" />
                    <div>
                      <p className="font-medium">API ключ</p>
                      <p className="text-sm text-muted-foreground font-mono">••••••••••••••••</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Изменить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
