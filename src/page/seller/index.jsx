import { Row, Col, Card, Statistic } from 'antd';
import { Pie, Line } from '@ant-design/charts';

const HomePage = () => {
  const statsData = {
    orders: 1250,
    products: 85,
    reviews: 320,
  };

  const pieData = [
    { type: 'Tháng 1', value: 4000 },
    { type: 'Tháng 2', value: 5500 },
    { type: 'Tháng 3', value: 7000 },
  ];

  const lineData = [
    { month: 'Th1', revenue: 4000 },
    { month: 'Th2', revenue: 5500 },
    { month: 'Th3', revenue: 7000 },
    { month: 'Th4', revenue: 6500 },
    { month: 'Th5', revenue: 8000 },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  const lineConfig = {
    data: lineData,
    xField: 'month',
    yField: 'revenue',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return (
    <div className="dashboard-container" style={{ padding: 24 }}>
      {/* Phần trên - Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số đơn hàng"
              value={statsData.orders}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số sản phẩm"
              value={statsData.products}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số đánh giá"
              value={statsData.reviews}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Phần dưới - Charts */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Phân bố doanh thu">
            <Pie {...pieConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Xu hướng doanh thu">
            <Line {...lineConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
