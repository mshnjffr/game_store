'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/types';
import { ordersApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, ArrowLeft } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const ordersData = await ordersApi.getAll();
          setOrders(ordersData.orders || []);
        } catch (error: any) {
          console.error('Error fetching orders:', error);
          setError('Failed to load orders');
        } finally {
          setOrdersLoading(false);
        }
      };

      fetchOrders();
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-2"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/account" className="text-primary hover:underline flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Account
          </Link>
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        {ordersLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Failed to Load Orders</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link href="/games">
              <Button>Browse Games</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <p className="text-lg font-bold mt-1">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                      <div className="space-y-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={item.id || index} className="flex justify-between items-center text-sm">
                            <span>{item.game?.title || 'Game'}</span>
                            <span>
                              {item.quantity}x {formatPrice(item.price)}
                            </span>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-gray-600">
                            +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium mb-1">Shipping Address</h4>
                    <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                  {order.status === 'delivered' && (
                  <Button variant="outline" size="sm">
                    Reorder
                    </Button>
                  )}
                  {(order.status === 'pending' || order.status === 'processing') && (
                  <Button variant="outline" size="sm">
                    Cancel Order
                    </Button>
                  )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Summary */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Orders</p>
                    <p className="font-bold text-lg">{orders.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Spent</p>
                    <p className="font-bold text-lg">
                      {formatPrice(orders.reduce((sum, order) => sum + order.totalAmount, 0))}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pending</p>
                    <p className="font-bold text-lg">
                      {orders.filter(order => order.status === 'pending').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Delivered</p>
                    <p className="font-bold text-lg">
                      {orders.filter(order => order.status === 'delivered').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
