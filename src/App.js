import { useState, useEffect } from "react";

export default function AdvancedHealthStudyCalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [studyHours, setStudyHours] = useState(100);
  const [dailyHours, setDailyHours] = useState(2); 
  const [studyIntensity, setStudyIntensity] = useState('medium');
  const [sleepHours, setSleepHours] = useState(8);
  const [waterIntake, setWaterIntake] = useState(2000);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  // Tính toán BMI và phân loại
  const bmi = (weight / Math.pow(height / 100, 2));
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Gầy', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (bmi < 25) return { category: 'Bình thường', color: 'text-green-600', bg: 'bg-green-50' };
    if (bmi < 30) return { category: 'Thừa cân', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { category: 'Béo phì', color: 'text-red-600', bg: 'bg-red-50' };
  };

  // Tính calories với Harris-Benedict cải tiến
  const bmr = gender === 'male' 
    ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  const totalCalories = Math.round(bmr * activityLevel);

  // Tính toán học tập
  const daysToFinish = Math.ceil(studyHours / dailyHours);
  const weeksToFinish = Math.ceil(daysToFinish / 7);
  const monthsToFinish = Math.ceil(daysToFinish / 30);

  // Calories đốt cháy khi học
  const studyCaloriesPerHour = studyIntensity === 'low' ? 60 : studyIntensity === 'medium' ? 80 : 100;
  const dailyStudyCalories = dailyHours * studyCaloriesPerHour;

  // Tính toán nước cần uống
  const recommendedWater = Math.round(weight * 35); // 35ml/kg

  // Đánh giá giấc ngủ
  const getSleepQuality = (hours) => {
    if (hours < 6) return { quality: 'Thiếu ngủ nghiêm trọng', color: 'text-red-600', icon: '😴' };
    if (hours < 7) return { quality: 'Thiếu ngủ', color: 'text-orange-600', icon: '😪' };
    if (hours <= 9) return { quality: 'Tốt', color: 'text-green-600', icon: '😊' };
    return { quality: 'Ngủ quá nhiều', color: 'text-blue-600', icon: '🛌' };
  };

  const bmiInfo = getBMICategory(bmi);
  const sleepInfo = getSleepQuality(sleepHours);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header với hiệu ứng gradient */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
            🚀 Trung tâm Điều khiển Sức khỏe & Học tập
          </h1>
          <p className="text-gray-300 text-lg">Tối ưu hóa cuộc sống của bạn với AI thông minh</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Panel Input - Trái */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Thông tin cơ thể */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">👤</span> Thông tin cơ thể
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Chiều cao (cm)</label>
                  <input 
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(+e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Cân nặng (kg)</label>
                  <input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(+e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Tuổi</label>
                  <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(+e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Giới tính</label>
                  <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  >
                    <option value="male" className="bg-gray-800">Nam</option>
                    <option value="female" className="bg-gray-800">Nữ</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Mức độ hoạt động</label>
                  <select 
                    value={activityLevel} 
                    onChange={(e) => setActivityLevel(+e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  >
                    <option value={1.2} className="bg-gray-800">Ít vận động</option>
                    <option value={1.375} className="bg-gray-800">Vận động nhẹ</option>
                    <option value={1.55} className="bg-gray-800">Vận động vừa</option>
                    <option value={1.725} className="bg-gray-800">Vận động nhiều</option>
                    <option value={1.9} className="bg-gray-800">Vận động rất nhiều</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Thông tin học tập */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">📚</span> Kế hoạch học tập
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Tổng số giờ cần học</label>
                  <input 
                    type="number" 
                    value={studyHours} 
                    onChange={(e) => setStudyHours(+e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Giờ học mỗi ngày</label>
                  <input 
                    type="number" 
                    value={dailyHours} 
                    onChange={(e) => setDailyHours(+e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Cường độ học tập</label>
                  <select 
                    value={studyIntensity} 
                    onChange={(e) => setStudyIntensity(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  >
                    <option value="low" className="bg-gray-800">Nhẹ nhàng</option>
                    <option value="medium" className="bg-gray-800">Trung bình</option>
                    <option value="high" className="bg-gray-800">Cao độ</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Giờ ngủ mỗi đêm</label>
                  <input 
                    type="number" 
                    value={sleepHours} 
                    onChange={(e) => setSleepHours(+e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Panel Kết quả - Giữa và Phải */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Dashboard Sức khỏe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* BMI Card */}
              <div className={`${bmiInfo.bg} border-2 border-white/20 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">📏 Chỉ số BMI</h3>
                  <div className="text-3xl font-bold text-gray-700">{bmi.toFixed(1)}</div>
                </div>
                <div className={`text-lg font-semibold ${bmiInfo.color} mb-2`}>
                  {bmiInfo.category}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((bmi / 35) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Calories Card */}
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">🔥 Calories hàng ngày</h3>
                  <div className="text-3xl font-bold">{totalCalories}</div>
                </div>
                <div className="text-sm opacity-80 mb-2">
                  Trao đổi chất cơ bản: {Math.round(bmr)} kcal
                </div>
                <div className="text-sm opacity-80">
                  Học tập đốt cháy: {dailyStudyCalories} kcal/ngày
                </div>
              </div>

              {/* Sleep Card */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{sleepInfo.icon} Giấc ngủ</h3>
                  <div className="text-3xl font-bold">{sleepHours}h</div>
                </div>
                <div className={`text-lg font-semibold ${sleepInfo.color} mb-2`}>
                  {sleepInfo.quality}
                </div>
                <div className="text-sm opacity-80">
                  Được khuyến nghị: 7-9 giờ/đêm
                </div>
              </div>

              {/* Water Card */}
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">💧 Nước uống</h3>
                  <div className="text-2xl font-bold">{(recommendedWater/1000).toFixed(1)}L</div>
                </div>
                <div className="text-sm opacity-80 mb-2">
                  Khuyến nghị: {recommendedWater}ml/ngày
                </div>
                <div className="text-sm opacity-80">
                  Hiện tại: {waterIntake}ml
                </div>
              </div>
            </div>

            {/* Timeline học tập */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">⏰</span> Timeline học tập
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-4 text-white text-center transform hover:scale-105 transition-all">
                  <div className="text-3xl font-bold">{daysToFinish}</div>
                  <div className="text-sm opacity-80">Ngày</div>
                </div>
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl p-4 text-white text-center transform hover:scale-105 transition-all">
                  <div className="text-3xl font-bold">{weeksToFinish}</div>
                  <div className="text-sm opacity-80">Tuần</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white text-center transform hover:scale-105 transition-all">
                  <div className="text-3xl font-bold">{monthsToFinish}</div>
                  <div className="text-sm opacity-80">Tháng</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-white/80 mb-2">
                  <span>Tiến độ hoàn thành</span>
                  <span>0/{studyHours} giờ</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4">
                  <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-4 rounded-full animate-pulse w-0"></div>
                </div>
              </div>

              {/* Lời khuyên thông minh */}
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-4 border border-emerald-400/30">
                <h4 className="text-emerald-400 font-bold mb-2">💡 Lời khuyên AI:</h4>
                <div className="text-white/90 text-sm space-y-1">
                  {bmi < 18.5 && <p>• Nên tăng cường dinh dưỡng để cải thiện sức khỏe</p>}
                  {bmi > 25 && <p>• Kết hợp học tập với vận động nhẹ để cải thiện sức khỏe</p>}
                  {sleepHours < 7 && <p>• Cần ngủ đủ giấc để tăng hiệu quả học tập</p>}
                  {dailyHours > 8 && <p>• Thời gian học quá dài, nên chia nhỏ để tránh mệt mỏi</p>}
                  <p>• Uống đủ nước và nghỉ ngơi 15 phút sau mỗi 2 giờ học</p>
                  <p>• Tối ưu thời gian học vào lúc 9-11h sáng và 14-16h chiều</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-4 text-white text-center transform hover:rotate-3 transition-all">
                <div className="text-2xl mb-1">🧠</div>
                <div className="text-lg font-bold">{Math.round(studyHours * 0.7)}</div>
                <div className="text-xs opacity-80">Giờ tập trung</div>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-4 text-white text-center transform hover:rotate-3 transition-all">
                <div className="text-2xl mb-1">☕</div>
                <div className="text-lg font-bold">{Math.round(daysToFinish * 1.5)}</div>
                <div className="text-xs opacity-80">Tách cà phê</div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-4 text-white text-center transform hover:rotate-3 transition-all">
                <div className="text-2xl mb-1">📝</div>
                <div className="text-lg font-bold">{Math.round(studyHours / 3)}</div>
                <div className="text-xs opacity-80">Bài kiểm tra</div>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-4 text-white text-center transform hover:rotate-3 transition-all">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-lg font-bold">{Math.round((studyHours / dailyHours) * 100 / studyHours)}%</div>
                <div className="text-xs opacity-80">Hiệu suất</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}