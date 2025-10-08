import Driver from '../models/driverModel.js';
import Customer from '../models/customerModel.js';
import Trip from '../models/tripModel.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalDrivers = await Driver.countDocuments();
    const activeUsers = await Customer.countDocuments({ status: 'Active' });
    const tripsToday = await Trip.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });
    
    // Get revenue (mock data for now)
    const revenueMTD = 48392;
    
    // Get live trips
    const liveTrips = await Trip.countDocuments({ status: 'InProgress' });
    
    // Get pending driver approvals
    const driverApprovals = await Driver.countDocuments({ status: 'Pending' });
    
    // Mock data for other stats
    const activeAlerts = 3;
    const growthRate = 127;
    
    // Mock activity data
    const activity = [
      { id: '1', icon: 'driver', description: 'Driver John Smith approved and activated', timestamp: '15 minutes ago', status: 'success' },
      { id: '2', icon: 'trip', description: 'Trip #TR-2847 completed successfully', timestamp: '32 minutes ago', status: 'success' },
      { id: '3', icon: 'payout', description: 'Weekly payout of ETB:2,847.50 processed to 23 drivers', timestamp: 'about 2 hours ago', status: 'success' },
      { id: '4', icon: 'warning', description: 'User Mike Johnson blocked due to policy violation', timestamp: 'about 4 hours ago', status: 'warning' },
    ];
    
    res.status(200).json({
      success: true,
      stats: {
        totalDrivers: { value: totalDrivers, change: 12 },
        activeUsers: { value: activeUsers, change: 8 },
        tripsToday: { value: tripsToday, change: -5 },
        revenueMTD: { value: revenueMTD, change: 23 },
        liveTrips: { value: liveTrips },
        driverApprovals: { value: driverApprovals },
        activeAlerts: { value: activeAlerts },
        growthRate: { value: growthRate },
      },
      activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};