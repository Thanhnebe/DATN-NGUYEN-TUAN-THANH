"use strict";

const Models = require("../models");
const PasswordUtils = require("../../services/password");
const OrderService = require("../../main/order/service");

const dataRole = [
  {
    nameRole: "admin",
    description: "admin",
    isActive: true,
  },
  {
    nameRole: "staff",
    description: "staff",
    isActive: true,
  },
  {
    nameRole: "user",
    description: "user",
    isActive: true,
  },
];

const dataUser = [
  {
    email: "admin@gmail.com",
    name: "Quản trị viên",
    role: "admin",
    isVerifyEmail: true,
  },
  {
    email: "staff1@gmail.com",
    name: "Nhân viên",
    role: "staff",
    isVerifyEmail: true,
  },
  {
    email: "user1@gmail.com",
    name: "Nguyễn Văn A",
    role: "user",
    isVerifyEmail: true,
  },
  {
    email: "kimnt@gmail.com",
    name: "Nguyễn Thị Kim",
    role: "user",
    isVerifyEmail: true,
  },
  {
    email: "hoaingoc@gmail.com",
    name: "Hoài Ngọc",
    role: "user",
    isVerifyEmail: true,
  },
  {
    email: "lanmy@gmail.com",
    name: "Mỹ Lan",
    role: "user",
    isVerifyEmail: true,
  },
  {
    email: "dungpt@gmail.com",
    name: "Pham Thi Dung",
    role: "user",
    isVerifyEmail: true,
  },
  {
    email: "bichth@gmail.com",
    name: "Pham Thi Dung",
    role: "user",
    isVerifyEmail: true,
  },
  {
    email: "tamht@gmail.com",
    name: "Hoàng Thị Tâm",
    role: "user",
    isVerifyEmail: true,
  },
  {
    email: "hoapt@gmail.com",
    name: "Phạm Thị Hoa",
    role: "user",
    isVerifyEmail: true,
  },
  {
    email: "ngoclt@gmail.com",
    name: "Lê Thị Ngọc",
    role: "user",
    isVerifyEmail: true,
  },
];

const orderSeed = [
  {
    fullName: "Nguyễn Thị Kim",
    address: {
      ward: "Phường Hoàng Văn Thụ",
      house: "Lạng Sơn",
      state: "Thành phố Lạng Sơn",
      codeWard: "05971",
      province: "Tỉnh Lạng Sơn",
      codeState: "178",
      codeProvince: "20",
    },
    note: "Giao giờ hành chính",
    phone: "0868299813",
    userId: 4,
    paymentMethod: "COD",
    products: [
      {
        quantity: 5,
        productId: 2,
      },
    ],
  },
  {
    fullName: "Nguyễn Thị Kim",
    address: {
      ward: "Phường Hoàng Văn Thụ",
      house: "Lạng Sơn",
      state: "Thành phố Lạng Sơn",
      codeWard: "05971",
      province: "Tỉnh Lạng Sơn",
      codeState: "178",
      codeProvince: "20",
    },
    note: "Giao giờ hành chính",
    phone: "0868299813",
    userId: 4,
    paymentMethod: "COD",
    products: [
      {
        quantity: 15,
        productId: 7,
      },
    ],
  },
  {
    fullName: "Phạm Thị Dung",
    address: {
      ward: "Phường Thanh Xuân Bắc",
      house: "Hà Nội",
      state: "Quận Thanh Xuân",
      codeWard: "01723",
      province: "Thành phố Hà Nội",
      codeState: "003",
      codeProvince: "01",
    },
    note: "Giao trong giờ hành chính",
    phone: "0967843211",
    userId: 7,
    paymentMethod: "COD",
    products: [
      {
        quantity: 16,
        productId: 1,
      },
    ],
  },
  {
    fullName: "Mỹ Lan",
    address: {
      ward: "Phường Phước Long A",
      house: "Nha Trang",
      state: "Quận Nha Trang",
      codeWard: "05050",
      province: "Tỉnh Khánh Hòa",
      codeState: "560",
      codeProvince: "56",
    },
    note: "Giao hàng buổi sáng",
    phone: "0923456789",
    userId: 6,
    paymentMethod: "Online",
    products: [
      {
        quantity: 1,
        productId: 16,
      },
      {
        quantity: 2,
        productId: 26,
      },
    ],
  },
  {
    fullName: "Trần Thị Bích",
    address: {
      ward: "Phường 15",
      house: "Hồ Chí Minh",
      state: "Quận 10",
      codeWard: "01500",
      province: "Thành phố Hồ Chí Minh",
      codeState: "770",
      codeProvince: "79",
    },
    note: "Giao nhanh trong 1 giờ",
    phone: "0901234567",
    userId: 8,
    paymentMethod: "COD",
    products: [
      {
        quantity: 1,
        productId: 37,
      },
      {
        quantity: 3,
        productId: 52,
      },
    ],
  },
  {
    fullName: "Hoàng Thị Tâm",
    address: {
      ward: "Phường Mỹ Đình 1",
      house: "Hà Nội",
      state: "Quận Nam Từ Liêm",
      codeWard: "01005",
      province: "Thành phố Hà Nội",
      codeState: "005",
      codeProvince: "01",
    },
    note: "Giao hàng sau 17h",
    phone: "0931234567",
    userId: 9,
    paymentMethod: "COD",
    products: [
      {
        quantity: 2,
        productId: 66,
      },
    ],
  },
  {
    "fullName": "Nguyễn Thị Lan",
    "address": {
      "ward": "Phường Thạch Bàn",
      "house": "Hà Nội",
      "state": "Quận Long Biên",
      "codeWard": "01015",
      "province": "Thành phố Hà Nội",
      "codeState": "004",
      "codeProvince": "01"
    },
    "note": "Giao vào buổi tối",
    "phone": "0948765432",
    "userId": 6,
    "paymentMethod": "COD",
    "products": [
      {
        "quantity": 3,
        "productId": 67
      }
    ]
  },
  {
    "fullName": "Phạm Thị Hoa",
    "address": {
      "ward": "Phường Cầu Kho",
      "house": "Hồ Chí Minh",
      "state": "Quận 1",
      "codeWard": "03002",
      "province": "Thành phố Hồ Chí Minh",
      "codeState": "769",
      "codeProvince": "79"
    },
    "note": "Giao trong giờ hành chính",
    "phone": "0914567890",
    "userId": 10,
    "paymentMethod": "COD",
    "products": [
      {
        "quantity": 1,
        "productId": 4
      }
    ]
  },
  {
    "fullName": "Lê Thị Ngọc",
    "address": {
      "ward": "Phường Lý Thái Tổ",
      "house": "Bắc Ninh",
      "state": "Thành phố Bắc Ninh",
      "codeWard": "08003",
      "province": "Tỉnh Bắc Ninh",
      "codeState": "095",
      "codeProvince": "21"
    },
    "note": "Giao sau 12h trưa",
    "phone": "0923456781",
    "userId": 11,
    "paymentMethod": "COD",
    "products": [
      {
        "quantity": 2,
        "productId": 12
      }
    ]
  },
];

const categorySeed = [
  {
    nameCategory: "Son môi",
    image: "https://kyo.vn/wp-content/uploads/2020/09/top-5-mau-son-mac.jpg",
    parent: null,
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.733Z",
  },
  {
    nameCategory: "Chăm sóc da",
    image:
      "https://medlatec.vn/media/11026/content/20210511_mat-na-dau-tay-sua-chua-khong-duong.jpg",
    parent: null,
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.733Z",
  },
  {
    nameCategory: "Thực phẩm chức năng",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/Images/quangcao/2018/01/25/suckhoedoisong.vn-_Tin_thng-_Thng_o.jpg",
    parent: null,
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.733Z",
  },
  {
    nameCategory: "Chăm sóc cơ thể",
    image:
      "https://mint07.com/wp-content/uploads/2019/07/routine-cham-soc-co-the-mua-he2.jpg",
    parent: null,
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.733Z",
  },
  {
    nameCategory: "Son thỏi",
    image:
      "https://nguyenlieulammypham.com.vn/wp-content/uploads/2015/10/thoi-son-dong-cao-cap.jpg",
    parent: "Son môi",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.798Z",
  },
  {
    nameCategory: "Trang điểm",
    image:
      "https://file.hstatic.net/200000073977/article/co-trang-diem-mat_7cfe329cdd1a469f988e6f721033b50c.png",
    parent: "Trang điểm",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.864Z",
  },
  {
    nameCategory: "Son dưỡng",
    image:
      "https://product.hstatic.net/1000025647/product/son-duong-dior-001-pink_1024x1024.png",
    parent: "Son môi",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.861Z",
  },
  {
    nameCategory: "Trang điểm mắt",
    image:
      "https://kbeauty.fpt.edu.vn/wp-content/uploads/2020/04/hoc-trang-diem-chuyen-nghiep-o-dau-uy-tin-va-chat-luong-4.jpg",
    parent: "Trang điểm",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.871Z",
  },
  {
    nameCategory: "Trang điểm mặt",
    image:
      "https://bloganchoi.com/wp-content/uploads/2019/09/kiem-tra-lop-trang-diem.jpg",
    parent: "Trang điểm",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.888Z",
  },
  {
    nameCategory: "Làm sạch",
    image:
      "https://drvitamin.net/wp-content/uploads/2021/05/cham-soc-da-mat-cho-nguoi-lam-ca-dem-1_optimized.jpg",
    parent: "Chăm sóc da",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.891Z",
  },
  {
    nameCategory: "Dưỡng da",
    image:
      "https://thanhnien.mediacdn.vn/Uploaded/dieutrang-qc/2021_10_22/mai-han-duong-am-1-8164.jpeg",
    parent: "Chăm sóc da",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.895Z",
  },
  {
    nameCategory: "Trị sẹo",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F20221119_Thuoc-boi-tri-seo-Contractubex.jpg?alt=media&token=9b9a088f-d354-4bdc-8824-c0badf426ed5",
    parent: "Đặc trị",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:15:54.279Z",
  },
  {
    nameCategory: "Đặc trị",
    image:
      "https://phyrisvietnam.vn/wp-content/uploads/2022/08/2-cham-soc-da-mun.jpg",
    parent: "Chăm sóc da",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-03T10:39:23.913Z",
  },
  {
    nameCategory: "Trị mụn",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fthuoc-tri-mun-klenzit-c.jpg?alt=media&token=4d6fb2d7-2359-4508-9279-c41164a5bd57",
    parent: "Đặc trị",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:16:35.315Z",
  },
  {
    nameCategory: "Mặt nạ ngủ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2FMat-na-ngu-Laneige-Water-Sleeping-Mask-EX-5.jpg?alt=media&token=fb8abeb9-ad79-438c-827b-77e85f2f4e8c",
    parent: "Mặt nạ",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:10:32.714Z",
  },
  {
    nameCategory: "Mặt nạ rửa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1688435531625-mat-na-i-m-from-lam-diu-va-thai-doc-da-mugwort-mask-30g-5.jpeg?alt=media&token=30a57fb1-199b-45f3-8eb0-cea8c64defc3",
    parent: "Mặt nạ",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:11:04.946Z",
  },
  {
    nameCategory: "Nước hoa hồng Toner",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fimages.jpg?alt=media&token=15511b6a-3808-4741-9bc2-bc7f4cb58238",
    parent: "Dưỡng da",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:11:37.845Z",
  },
  {
    nameCategory: "Kem dưỡng",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fh2-5874.jpg?alt=media&token=1b438dc8-1fdd-4cf0-a4aa-9e91925e1c80",
    parent: "Dưỡng da",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:12:11.762Z",
  },
  {
    nameCategory: "Serum/ Tinh chất",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fserum-b5-goodndoc-2-1.jpg?alt=media&token=bdd3ed9f-8f01-45b2-8d9c-5dd02b50ab8b",
    parent: "Dưỡng da",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:14:08.586Z",
  },
  {
    nameCategory: "Sữa tắm",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-enchanteur-sach-khuan-huong-charming-650g-thumb-600x600.jpg?alt=media&token=374a3a14-8c6e-4f4d-85e6-1f3011c0c84a",
    parent: "Làm sạch cơ thể",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:08:38.419Z",
  },
  {
    nameCategory: "Dụng cụ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F8b88654e-ad78-4ec3-8cb0-3212f6d5e087.webp?alt=media&token=8619815d-10ea-428c-ba0b-bde1a5961270",
    parent: null,
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:09:09.094Z",
  },
  {
    nameCategory: "Mặt nạ giấy",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fhuong-dan-cach-lam-mat-na-giay-don-gian-cho-tung-loai-da-202111150700380444.jpg?alt=media&token=9339a868-5d07-4dc6-a6ef-2b88726ebcf4",
    parent: "Mặt nạ",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:09:44.077Z",
  },
  {
    nameCategory: "Kích mí",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fcach-dan-mi-mat.jpg?alt=media&token=de44aaf3-5d2e-4d56-a0e2-9553f9c62dfa",
    parent: "Dụng cụ trang điểm",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:02:39.068Z",
  },
  {
    nameCategory: "Nước hoa nữ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2FNuoc-Hoa-Nu-Chanel-Chance-Eau-Tendre-EDP.jpg?alt=media&token=a1647c8d-2cd3-4dc5-8814-838a0f40757c",
    parent: "Nước hoa",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:00:27.321Z",
  },
  {
    nameCategory: "Dụng cụ trang điểm",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F10-bo-trang-diem-ca-nhan-day-du-de-dung-cho-nguoi-moi-bat-dau-202303221103316086.jpg?alt=media&token=db552673-1dee-400d-9428-a9a2a8feb636",
    parent: "Dụng cụ",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:03:10.895Z",
  },
  {
    nameCategory: "Cọ trang điểm",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fset-6-co-trang-diem-focallure.jpg?alt=media&token=c13791aa-74ac-4ada-af7e-2d20a64edac1",
    parent: "Dụng cụ trang điểm",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:03:41.220Z",
  },
  {
    nameCategory: "Xà phòng",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fxb%202.jpg?alt=media&token=17ba8394-3d6b-4966-8c96-fe0ce58345e7",
    parent: "Làm sạch cơ thể",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:04:07.099Z",
  },
  {
    nameCategory: "Dụng cụ chăm sóc da",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fdung-cu-cham-soc-da-mat-anh-dai-dien_ed2b7d296cf4493ab6ac0a0d83a6bf83.webp?alt=media&token=6c80babe-1995-4342-bb61-fecaca6ef715",
    parent: "Dụng cụ",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:04:43.328Z",
  },
  {
    nameCategory: "Mi giả",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F20210415_C9TEs3hWpRg1hGsBMup8t4in.jpg?alt=media&token=c8463745-92c8-4685-9b35-2c413e980b79",
    parent: "Dụng cụ trang điểm",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:05:15.236Z",
  },
  {
    nameCategory: "Kẹp mi",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fshiseido-1.jpg?alt=media&token=723a88e9-8295-4dee-8caf-1a25f024f2cf",
    parent: "Dụng cụ trang điểm",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:05:44.443Z",
  },
  {
    nameCategory: "Son kem",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-kem-li-lip-blurrism-long-lasting-matte-fmgt.jpg?alt=media&token=2f9aea17-bb76-4e0d-a50b-58b235a7bf94",
    parent: "Son môi",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:06:14.887Z",
  },
  {
    nameCategory: "Bông tẩy trang",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fbong-tay-trang-cotton-pads-1.webp?alt=media&token=c87889a7-c5f3-4315-980f-d85d5967eb1b",
    parent: "Dụng cụ trang điểm",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:06:40.860Z",
  },
  {
    nameCategory: "Nước hoa nam",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2FNuoc-Hoa-Nam-Chanel-Bleu-de-Chanel-EDP.jpg?alt=media&token=fdcfef6a-7bc1-42ba-8f42-5682eafc2839",
    parent: "Nước hoa",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:07:08.331Z",
  },
  {
    nameCategory: "Nước hoa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2FNuoc-Hoa-Nu-Chanel-Coco-Mademoiselle-Intense.jpg?alt=media&token=0f99c1a1-6d98-4c30-921a-fbd32553c10c",
    parent: null,
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:07:40.460Z",
  },
  {
    nameCategory: "Tẩy da chết body",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fda-sang-khoe-tuyet-doi-voi-5-cach-tay-te-bao-chet-toan-than-cuc-chuan-5.jpg?alt=media&token=9fd9d7c8-7421-4458-8783-d854e80d75d9",
    parent: "Làm sạch cơ thể",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.734Z",
    updatedAt: "2024-09-08T05:08:09.312Z",
  },
  {
    nameCategory: "Tẩy trang",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Ftay-trang-9-1694569164377246412440.webp?alt=media&token=1ff240b3-336c-428e-a0c0-c7ea1c7f3044",
    parent: "Làm sạch",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:12:44.457Z",
  },
  {
    nameCategory: "Sửa rửa mặt",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F4901872471614-sua-rua-mat-tri-mun-senka-perfect-whip-medicated-120g(1).jpg?alt=media&token=d26c0a7e-ef49-4fee-a85a-a1c3e72e9e66",
    parent: "Làm sạch",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:13:30.938Z",
  },
  {
    nameCategory: "Làm sạch cơ thể",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fimages%20(1).jpg?alt=media&token=020e83be-8968-4371-9dab-55d201aeb5e4",
    parent: "Chăm sóc cơ thể",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:15:13.505Z",
  },
  {
    nameCategory: "Mặt nạ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fhuong-dan-cach-lam-mat-na-giay-don-gian-cho-tung-loai-da-202111150700380444.jpg?alt=media&token=9dc5616c-2ad8-4546-b368-1be44543d8d3",
    parent: "Chăm sóc da",
    isActive: true,
    description: null,
    createdAt: "2024-09-03T10:39:23.733Z",
    updatedAt: "2024-09-08T05:15:28.782Z",
  },
];

const dataProducer = [
  {
    name: "3CE",
    image:
      "https://storage.beautyfulls.com/uploads-1/sg-thumbs/images-chorme/760x400/2022/11/30/figure-1669774808164-jpg.webp",
    isActive: true,
    categoryId: "Son môi",
  },
  {
    name: "Romand",
    image:
      "https://www.koreanbeautysecret.com.hk/image/cache/Romand/romand-logo-600x315.jpg",
    isActive: true,
    categoryId: "Son môi",
  },
  {
    name: "REN Clean Skincare",
    image:
      "https://www.renskincare.com/cdn/shop/files/new-ren-logo.png?v=1623684341&width=500",
    isActive: true,
    categoryId: "Dưỡng da",
  },
  {
    name: "Hada Labo",
    image:
      "https://hadalabo.com.ph/wp-content/uploads/2023/09/cropped-Hada-Lobo-New-Logo.png",
    isActive: true,
    categoryId: "Làm sạch",
  },
  {
    name: "MAC Cosmetics",
    image:
      "https://thietkelogo.mondial.vn/wp-content/uploads/2024/01/image-35.png",
    isActive: true,
    categoryId: "Son môi",
  },
  {
    name: "Dior",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MhWkWel_MWdxUVA60lMnDtDnMrlp-Q_WtA&s",
    isActive: true,
    categoryId: "Dưỡng da",
  },
  {
    name: "Sao Thái Dương",
    image:
      "https://stdgroup.vn/wp-content/uploads/2016/11/logo-saothaiduong.jpg",
    isActive: true,
    categoryId: "Đặc trị",
  },
  {
    name: "Holika Holika",
    image:
      "https://thietkelogo.mondial.vn/wp-content/uploads/2024/01/Mau_thiet_ke_logo_thuong_hieu_cong_ty_HOLIKA-HOLIKA-2.jpg",
    isActive: true,
    categoryId: "Thực phẩm chức năng",
  },
  {
    name: "L'Oréal",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxdSu9NHSXHIOmY7DCo5j2_VX29o2WEIBiA&s",
    isActive: true,
    categoryId: "Chăm sóc cơ thể",
  },
  {
    name: "La Roche-Posay",
    image:
      "https://thietkelogo.mondial.vn/wp-content/uploads/2024/01/La-Roche-Posay-Logo.jpg",
    isActive: true,
    categoryId: "Chăm sóc da",
  },
  {
    name: "REN Clean Skincare",
    image:
      "https://www.renskincare.co.uk/cdn/shop/files/Amazon_A__600x450_6eeb3548-4024-4bfb-b6d9-d527c6e43795.jpg?v=1697216278",
    isActive: true,
    categoryId: "Trang điểm",
  },
  {
    name: "Gucci",
    image: null,
    isActive: true,
    categoryId: "Dưỡng da",
  },
];

const dataProduct = [
  {
    nameProduct: "Maybelline New York Fit Me Matte + Poreless Foundation",
    image: "https://img.ws.mms.shopee.vn/1a6e9117a85e2e286e3af67cec735896",
    price: 180000,
    cost: 10000,
    percentDiscount: 2,
    originalPrice: 200000,
    numberAvailable: 312,
    description:
      "<p>Nền tảng làm mờ lỗ chân lông và kiểm soát dầu, mang lại làn da mịn màng và tự nhiên.</p>",
    properties: {},
    gallery: [
      "https://images-na.ssl-images-amazon.com/images/I/71Y5KuNY-0L.jpg",
      "https://medias.watsons.vn/publishing/WTCVN-209203-front-XeGKSxpN-zoom.jpg?version=1722699391",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trang điểm",
    producerId: "REN Clean Skincare",
  },
  {
    nameProduct: "Son Mac Matte Lipstick - Ruby Woo",
    image:
      "https://product.hstatic.net/1000391653/product/773602040605-1_2d758ebdee8647d59f6d99b50727ef48.jpg",
    price: 180000,
    cost: 120000,
    percentDiscount: 2,
    originalPrice: 200000,
    numberAvailable: 120,
    description:
      "<p>Son môi matte với màu đỏ tươi nổi bật và khả năng bám màu lâu.</p>",
    properties: {},
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScchx-XZ7_PDjZBpKHRayunYax-xfMyl2ggA&s",
      "https://beautybyco.vn/wp-content/uploads/2022/08/a9bca4d580fd558b5aa1f5d5c086101e.jpg",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son môi",
    producerId: "MAC Cosmetics",
  },
  {
    nameProduct: "Kem Chống Nắng La Roche-Posay Anthelios Melt-in Milk SPF 60",
    image:
      "https://images.depxinh.net/products/2022/7/90104/default/kem-chong-nang-la-roche-posay-anthelios-150ml-5-dep-xinh.jpg",
    price: 360000,
    cost: 200000,
    percentDiscount: 50,
    originalPrice: 720000,
    numberAvailable: 70,
    description:
      "<p>Kem chống nắng với SPF 60, bảo vệ da khỏi tác hại của tia UV và làm mềm da.</p>",
    properties: {},
    gallery: [
      "https://img.lazcdn.com/g/p/104a15bf6b9e070258d6e1f22300516e.jpg_720x720q80.jpg",
      "https://images.depxinh.net/products/2022/7/90104/default/kem-chong-nang-la-roche-posay-anthelios-150ml-3-dep-xinh.jpg",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Chăm sóc da",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Hada Labo Gokujyun Hyaluronic Acid Lotion",
    image: "https://kbeautystore.com/cdn/shop/files/IMG_4069.webp?v=1690659961",
    price: 180000,
    cost: 140000,
    percentDiscount: 50,
    originalPrice: 360000,
    numberAvailable: 60,
    description:
      "<p>Nước hoa hồng chứa axit hyaluronic giúp dưỡng ẩm và làm mềm da.</p>",
    properties: {},
    gallery: [
      "https://cdn.shopify.com/s/files/1/0231/1294/1648/files/IMG_4333_480x480.jpg?v=1636034680",
      "https://mint07.com/wp-content/uploads/2015/06/nuoc-hoa-hong-hadalabo-hydrating-light-2.jpg",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Chăm sóc da",
    producerId: "Hada Labo",
  },
  {
    nameProduct:
      "Má Kem Lemonade Perfect Couple Blush 2 Đầu Mịn Lì Love Edition 2 - Lucky",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2F8994456650099.webp?alt=media&token=de905ea8-62da-4117-906a-f305353f59b3",
    price: 183000,
    cost: 128099,
    percentDiscount: 7,
    originalPrice: 195810,
    numberAvailable: 500,
    description:
      '<p>Má kem Lemonade Perfect Couple Blush 2 đầu mịn lì nằm trong bộ sưu tập kỷ niệm 5 năm của thương hiệu Lemonade, đánh dấu một cột mốc quan trọng trong hành trình phát triển của thương hiệu này.</p><p>Với thiết kế độc đáo 2 đầu, má kem Lemonade mang lại sự tiện lợi tối ưu. Một đầu chứa má kem mịn lì với ba tông màu độc đáo, từ sắc hồng ngọt ngào đến cam tươi trẻ, phù hợp với mọi phong cách trang điểm và tông da. Đầu kia là cọ mềm mịn, được thiết kế đặc biệt để giúp bạn dễ dàng tán đều sản phẩm, mang lại hiệu ứng gò má ửng hồng tự nhiên, không tạo cảm giác nặng mặt hay bí da.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2.jpg"></p><p>Má kem Lemonade Perfect Couple Blush không chỉ dễ tán, mịn màng mà còn có khả năng kiềm dầu và bền màu suốt 10 giờ đồng hồ, giúp bạn tự tin rạng rỡ cả ngày dài. Đặc biệt, với chứng nhận thuần chay từ tổ chức BIORIUS, sản phẩm thể hiện cam kết của Lemonade với lối sống bảo vệ môi trường và không gây hại cho động vật.</p><p><img src="https://cocolux.com/storage/upload_image/images/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-6.jpg"></p><p>Má kem Lemonade Perfect Couple Blush 2 Đầu Mịn Lì chắc chắn sẽ là lựa chọn không thể thiếu trong bộ sưu tập trang điểm của những cô gái yêu thích vẻ đẹp tự nhiên, rạng rỡ. Hiện má kem Lemonade Perfect Couple Blush 2 đầu mịn lì đang được phân phối tại Cocolux với 3 tông màu độc đáo, phù hợp với mọi phong cách trang điểm và tông da:</p><p><strong>#05 Cánh hoa hồng khô</strong>: Một sắc hồng ngọt ngào kết hợp với ánh đất, mang đến vẻ ngoài trong trẻo, tự nhiên, phù hợp với những bạn yêu thích vẻ đẹp dịu dàng, nữ tính.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-05.jpg"></p><p><strong>#09 Cam san hô</strong>: Tông màu cam tươi sáng, trẻ trung kết hợp hoàn hảo với ánh hồng nhẹ nhàng, tạo nên sự cân bằng tuyệt vời, thích hợp cho mọi dịp từ hàng ngày đến những buổi tiệc.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-09.jpg"></p><p><strong>#18 Cam nâu đất:</strong> Sự pha trộn giữa màu cam và nâu đất tạo nên một tông màu ấm áp, mang lại vẻ ngoài rạng rỡ, khỏe khoắn, phù hợp với nhiều tone da và dễ dàng kết hợp với các phong cách trang điểm khác nhau.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-18.jpg"></p><p>Mới đây, Lemonnade cũng đã cho ra mắt phiên bản cải tiến của phấn má này mang tên&nbsp;Má Kem Lemonade Perfect Couple Blush 2 Đầu Mịn Lì Love Edition 2 với nhiều ưu điểm tuyệt vời.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-1.jpg"></p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-7.jpg"></p><p>Má Kem Lemonade Perfect Couple Blush 2 Đầu Mịn Lì Love Edition 2 hiện có các tông màu như sau:</p><p><strong>#Lucky</strong>: Màu hồng tím sữa.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-lucky.jpg"></p><p><strong>#Cherish</strong>: Màu cam sữa</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-cherish.jpg"></p><p><strong>#Sharing</strong>: Màu đào san hô</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/ma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-sharing.jpg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-1.jpg?alt=media&token=96bea772-cd95-4e34-a103-f5f3c080c1a8",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-1.jpg?alt=media&token=9f2a6cf8-13e6-4ff6-97a6-2d043e12cc8f",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-8.jpg?alt=media&token=bdc3671e-32d6-439e-b03c-179cf23b6b35",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fma-kem-lemonade-perfect-couple-blush-2-dau-min-li-edition-2-sharing.jpg?alt=media&token=de0e3941-bb60-4832-9f80-5150440e5456",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trang điểm",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Kem Dưỡng Da L'Oréal Paris Revitalift Triple Power",
    image:
      "https://bizweb.dktcdn.net/100/157/490/products/195654858-2907792749548851-9136662685567102588-n.jpg?v=1623406693153",
    price: 200000,
    cost: 140000,
    percentDiscount: 50,
    originalPrice: 400000,
    numberAvailable: 50,
    description:
      "<p><strong>Kem dưỡng da chống lão hóa mạnh mẽ với công thức ba tác động để giảm nếp nhăn và làm săn chắc da.</strong></p>",
    properties: {},
    gallery: [
      "https://img.lazcdn.com/g/p/c693653c34d65686eee9a17cc54f9c4b.jpg_960x960q80.jpg_.webp",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/443/867/products/serum-chong-lao-hoa-l-oreal-revitalift-triple-power-anti-aging-serum-30ml.png?v=1710556560727",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Chăm sóc da",
    producerId: "L'Oréal",
  },
  {
    nameProduct:
      "Kem Lót The Face Shop Air Cotton Makeup Base SPF30 PA++ 02 Lavender (Tím)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2F1612315711800-kem-lot-the-face-shop-air-cotton-makeup-base.webp?alt=media&token=18089b29-a1b9-4cd3-9f4e-10a67c31d1fb",
    price: 95000,
    cost: 66500,
    percentDiscount: 72,
    originalPrice: 163400,
    numberAvailable: 150,
    description:
      '<h2>Mô tả sản phẩm</h2><p>Kem Lót The Face Shop Air Cotton Makeup Base SPF30 PA++ là loại kem lót được đánh giá là có khả năng hiệu chỉnh màu sắc của da, nâng tone nhẹ nhàng giúp da trở nên rạng ngời, tươi tắn. Cùng với đó là chỉ số chống nắng SPF30 PA++ bảo vệ da khỏi những ảnh hưởng của ánh nắng mặt trời, nhất là vào mùa hè nắng gắt.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/09/images/products/1662437110798-kem-lot-the-face-shop-air-cotton-makeup-base-spf30-pa-01.jpeg"></p><p>Nhìn chung công dụng của 2 loại kem lót khá giống nhau, đều có tác dụng làm đều màu da, cấp ẩm cho da và che đi những khuyết điểm giúp da sáng hồng, tươi tắn. Tuy nhiên thì màu tím sẽ thiên hơn về việc làm đều màu da và màu xanh sẽ hỗ trợ che khuyết điểm tốt hơn. Sản phẩm khiến khách hàng ấn tượng bởi khả năng giữ lớp make up mỏng nhẹ, lâu trôi trong suốt nhiều giờ.&nbsp;</p><p>Hiện nay Cocolux đang có sẵn 2 tone:&nbsp;</p><p>Loại da phù hợp: Mọi loại da</p><p>-&nbsp;<strong>#01 Mint (Xanh lá) hương bạc hà:</strong>&nbsp;thích hợp cho làn da có sắc đỏ, da mụn</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/09/images/products/1662437114616-kem-lot-the-face-shop-air-cotton-makeup-base-spf30-pa-5.jpeg"></p><p>-&nbsp;<strong>#02 Lavender (Tím) hương lavender:</strong>&nbsp;thích hợp với làn da xanh xao, nhợt nhạt, thiếu sức sống giúp da hồng hào, tươi tắn và che đi những khuyết điểm trên da.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/09/images/products/1662437118364-kem-lot-the-face-shop-air-cotton-makeup-base-spf30-pa-6.jpeg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2F1617868402150-kem-lot-air-the-face-shop-2.jpeg?alt=media&token=1b8f83e7-e11e-4c89-a792-372464288ebb",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trang điểm",
    producerId: "REN Clean Skincare",
  },
  {
    nameProduct: "Nước Uống Collagen Elasten Chống Lão Hóa",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-uong-elasten-bo-sung-collagen-chong-lao-hoa-8.webp?alt=media&token=a4a53b32-a808-4e5f-b5a7-1a7e3e120fc1",
    price: 2500000,
    cost: 1750000,
    percentDiscount: 86,
    originalPrice: 4650000,
    numberAvailable: 1000,
    description:
      "<p>Thực phẩm chức năng là một trong những dòng sản phẩm được đông đảo mọi người ưa chuộng bởi độ tiện lợi cũng như hiệu quả tuyệt vời mà nó đem lại. Một trong những sản phẩm đang được yêu thích hiện nay chính là Nước Uống&nbsp;Collagen Elasten Chống Lão Hóa.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-uong-elasten-bo-sung-collagen-chong-lao-hoa-2.jpg?alt=media&token=dfdefb02-154d-4c31-bbc3-2151254286dd",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-uong-elasten-bo-sung-collagen-chong-lao-hoa-9.jpg?alt=media&token=2b268cd7-10e0-4d95-8107-fe386382b9a2",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Thực phẩm chức năng",
    producerId: "Sao Thái Dương",
  },
  {
    nameProduct:
      "Phấn Mắt Milk Touch Be My Sweet Dessert House Palette - 05 Peach Coconut",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fphan-mat-milk-touch-be-my-sweet-dessert-house-palette-05-peach-coconut-1.webp?alt=media&token=abb84b27-d6d4-40ed-b17f-3545b396fbd4",
    price: 415000,
    cost: 290500,
    percentDiscount: 69,
    originalPrice: 701350,
    numberAvailable: 1000,
    description:
      '<p>Phấn Mắt Milk Touch Be My Sweet Dessert House Palette là một bảng phấn mắt gồm 8 gam màu đa dạng, lấy cảm hứng từ những món tráng miệng hấp dẫn của Hàn Quốc. Sản phẩm này mang đến sự kết hợp hoàn hảo giữa những gam màu dịu dàng hàng ngày và những tông màu nổi bật, tạo nên vẻ ngoài tự nhiên và cuốn hút.</p><p>Phấn Mắt Milk Touch Be My Sweet Dessert House Palette bao gồm các tông màu từ nhẹ nhàng đến sắc nét, với chất phấn mềm mịn, dễ tán và lên màu chuẩn. Bạn có thể bắt đầu bằng việc áp dụng màu nền trên toàn bộ bầu mắt, sau đó sử dụng màu sắc nổi bật cho viền mắt, góc ngoài hoặc để tạo hiệu ứng chuyển màu tinh tế. Đặc biệt, các gam màu nhũ và bóng lấp lánh có thể được sử dụng để làm nổi bật góc trong mắt, dưới đường mi mắt hoặc vùng dưới xương chân mày, mang lại ánh sáng rạng rỡ và sức sống cho khuôn mặt.</p><p>Hiện tại, Phấn Mắt Milk Touch Be My Sweet Dessert House Palette đã có mặt tại các cửa hàng của Cocolux với tone màu:</p><p><strong>04 Oat Banana</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/phan-mat-milk-touch-be-my-sweet-dessert-house-palette-04-oat-banana%20(2).jpg"></p><p><strong>05 Peach Coconut</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/phan-mat-milk-touch-be-my-sweet-dessert-house-palette-05-peach-coconut-2.jpg"></p><p><br></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fphan-mat-milk-touch-be-my-sweet-dessert-house-palette-05-peach-coconut-5.jpeg?alt=media&token=e0272c23-c218-4a7e-b6a8-fad1e6dd09e4",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fphan-mat-milk-touch-be-my-sweet-dessert-house-palette-05-peach-coconut-7.jpeg?alt=media&token=4b394636-fe38-4d0d-9a93-c6cc9049062b",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fphan-mat-milk-touch-be-my-sweet-dessert-house-palette-05-peach-coconut-8.jpeg?alt=media&token=b0f7a71a-76c8-4f94-8d27-da564208924d",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trang điểm mắt",
    producerId: "MAC Cosmetics",
  },
  {
    nameProduct: "Dạ Kẻ Mắt CLIO Superproof Brush Liner Kill Black Màu Nâu",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fda-ke-mat-clio-superproof-brush-liner-kill-black-mau-nau.webp?alt=media&token=755cd644-92fc-4718-afa2-3b693a64d25d",
    price: 248000,
    cost: 173600,
    percentDiscount: 90,
    originalPrice: 471200,
    numberAvailable: 900,
    description:
      '<p>Dạ Kẻ Mắt CLIO Superproof Brush Liner Kill Black là sản phẩm đến từ thương hiệu mỹ phẩm nổi tiếng Clio.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/da-ke-mat-clio-superproof-brush-liner-kill-black-mau-den-2.jpg"></p><p>Sản phẩm có đầu dạ microfiber siêu mảnh, đàn hồi, giúp bạn dễ dàng kẻ những đường kẻ mắt mảnh mai, sắc nét. Với kích thước này, bạn cũng có thể tùy biến ra những đường kẻ mắt đa dạng khác nhau.</p><p>CLIO Superproof Brush Liner Kill Black có lớp lót cố định siêu chống thấm, giúp giữ đường kẻ mắt không lem, không nhoè dài lâu. Màu mực đen của sản phẩm chuẩn tự nhiên, không vón cục, dễ dàng kẻ đường kẻ mắt chỉ sau một lần lướt.</p><p>Hiện tại, Cocolux đang có sẵn 2 phân loại của sản phẩm. Cụ thể:</p><p>- Màu đen:</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/da-ke-mat-clio-superproof-brush-liner-kill-black-mau-den-1.jpg"></p><p>- Màu nâu:</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/da-ke-mat-clio-superproof-brush-liner-kill-black-mau-nau-1.jpg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fda-ke-mat-clio-superproof-brush-liner-kill-black-mau-nau-1.jpg?alt=media&token=afc47a17-71f8-4bc9-a388-c27e1fef441e",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fda-ke-mat-clio-superproof-brush-liner-kill-black-mau-nau.webp?alt=media&token=4b9d062f-a231-4edf-8837-77e0e455c4a9",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trang điểm mắt",
    producerId: "REN Clean Skincare",
  },
  {
    nameProduct:
      "Son Thỏi MAC Powder Kiss Lipstick 934 Healthy, Wealthy and Thriving",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fson-thoi-mac-powder-kiss-lipstick-934-healthy-wealthy-and-thriving-1.webp?alt=media&token=48eb6123-2437-4b0e-b445-0fcd73ffbc1d",
    price: 640000,
    cost: 448000,
    percentDiscount: 50,
    originalPrice: 960000,
    numberAvailable: 680,
    description:
      '<p>Son Thỏi MAC Powder Kiss Lipstick 934 Healthy, Wealthy and Thriving&nbsp;đã tạo nên một cơn sốt trong giới làm đẹp với chất son lì hoàn toàn mới lạ. Thay vì lớp finish lì hoàn toàn, son MAC Powder Kiss mang đến một hiệu ứng mờ ảo, mềm mại, tạo cảm giác như đang hôn lên một đám mây.</p><p><img src="https://cocolux.com/storage/upload_image/images/son-thoi-mac-powder-kiss-lipstick-934-healthy-wealthy-and-thriving-2.jpg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fson-thoi-mac-powder-kiss-lipstick-934-healthy-wealthy-and-thriving-3.jpg?alt=media&token=769d764a-bb78-472c-8537-2c565bfac70c",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fson-thoi-mac-powder-kiss-lipstick-934-healthy-wealthy-and-thriving-2.jpg?alt=media&token=48bb181b-2680-46ce-a2ce-f0c0670c0037",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son thỏi",
    producerId: "MAC Cosmetics",
  },
  {
    nameProduct: "Son Kem Peripera Ink Velvet 15 4g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fson-kem-peripera-ink-velvet-40-calm-rosy-1.webp?alt=media&token=51586c07-5f86-4950-88e5-ae744777db1d",
    price: 148000,
    cost: 103600,
    percentDiscount: 74,
    originalPrice: 257520,
    numberAvailable: 200,
    description:
      '<p>Nếu bạn là tín đồ của mỹ phẩm Hàn Quốc thì không thể bỏ qua dòng Son Kem Peripera Ink Velvet.</p><p><br></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/06/images/products/1657614475081-son-kem-peripera-ink-velvet.jpeg"></p><p><br></p><p>Son Kem Peripera Ink Velvet đến từ thương hiệu mỹ phẩm nổi tiếng của Hàn Quốc Peripera. Sản phẩm có kết cấu dạng velvet mềm mượt, mịn lỳ như nhung. Son chia làm hai lớp: lớp đầu là lớp dưỡng giúp cung cấp độ ẩm cho môi, lớp cuối matte mịn lì, cho đôi môi bạn mềm mại, căng bóng, không hề gây khô môi hay nặng môi. Công thức bám dính tốt với khả năng đàn hồi giúp làm nổi bật những đường nét của đôi môi, cho môi bạn lớp son mềm mại, mượt mà.</p><p>Peripera Ink Velvet có độ che phủ cao, không lộ vân môi, giúp che hết những khuyết điểm trên môi, cho đôi môi đẹp hoàn hảo. Khi apply lên môi, chất son mướt mịn, lướt nhẹ nhàng trên môi, không gây cảm giác nặng môi. Son lên màu chuẩn chỉ sau một lần đánh.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/06/images/products/1657614482565-son-kem-peripera-ink-velvet-2.jpeg"></p><p><br></p><p>Sản phẩm có thiết kế đơn giản, bắt mắt. Son Kem Peripera Ink Velvet có dạng trụ tròn nhỏ nhắn. Phần vỏ son được thiết kế trùng với màu son và thông tin son được in trên thân son, giúp các nàng có thể nhận biết được màu son yêu thích của bản thân.. Cọ son được thiết kế đầu vát nhọn giúp dễ dàng lấy son và đánh những dáng môi mà các nàng ưng ý.</p><p>Bộ sưu tập son kem Peripera bao gồm nhiều màu sắc hiện đại, trẻ trung, trendy từ tone màu nude cho đến những tone màu rực rỡ, tươi sáng. Son có khả năng lên màu chuẩn đẹp tự nhiên chỉ sau một ần lướt cọ.&nbsp;</p><p>Hiện tại, Son Kem Peripera Ink Velvet đang óc sẵn tại Cocolux với những màu như sau:</p><p>01 Good Brick: màu đỏ trầm</p><p><br></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/06/images/products/1657614490919-son-kem-peripera-ink-velvet-01.jpeg"></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/06/images/products/1657614499034-son-kem-peripera-ink-velvet-01-1.jpeg"></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/06/images/products/1657614507161-son-kem-peripera-ink-velvet-01-2.jpeg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fson-kem-peripera-ink-velvet-40-calm-rosy-2.jpg?alt=media&token=0b011f64-1068-4a7e-a0ec-315a5eb03a9b",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fson-kem-peripera-ink-velvet-40-calm-rosy-2.jpg?alt=media&token=0e304cf4-4f99-4ad2-adc9-86a6ed6825e4",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son dưỡng",
    producerId: "Romand",
  },
  {
    nameProduct: "Nước Hoa Hồng Mincer Pharma Daily Care No 04 250ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-hong-mincer-pharma-daily-care-no-04-250ml.webp?alt=media&token=821ba7e2-6635-4da4-afcf-a9df126db4ed",
    price: 100000,
    cost: 70000,
    percentDiscount: 53,
    originalPrice: 153000,
    numberAvailable: 329,
    description: null,
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fnuoc-hoa-hong-mincer-pharma-daily-care-no-04-250ml-1.jpg?alt=media&token=59591c7b-8cbc-47bf-a502-b52610dce702",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fnuoc-hoa-hong-mincer-pharma-daily-care-no-04-250ml-5.jpg?alt=media&token=53512af2-ba2c-4326-9d52-87509e9bd9c3",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Chăm sóc da",
    producerId: "Dior",
  },
  {
    nameProduct: "Son Dưỡng LipIce Sheer Color #Brick Red Đỏ Gạch 2.4g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fson-duong-lipice-sheer-color-brick-red-do-gach-24g-1.webp?alt=media&token=1f57b22d-3227-4801-8e19-d9a6f33f48cb",
    price: 78000,
    cost: 54600,
    percentDiscount: 50,
    originalPrice: 117000,
    numberAvailable: 239,
    description:
      '<p><strong>Son Dưỡng LipIce Sheer Color 2.4g</strong>&nbsp;là một sản phẩm chăm sóc môi đến từ thương hiệu LipIce nổi tiếng. Với kết cấu mềm mịn, son dưỡng này không chỉ cung cấp độ ẩm cần thiết cho đôi môi khô nứt mà còn mang lại màu sắc tự nhiên, giúp đôi môi bạn luôn hồng hào và căng mọng.</p><p>Hiện tại Cocolux đang có sẵn 2 màu:</p><p><strong>Sandy Pink: Màu hồng đất</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/mo-ta-son-duong-lipice-sheer-color-sandy-pink-hong-dat-24g.jpg"></p><p><strong>Brick Red: Màu đỏ gạch</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/mo-ta-son-duong-lipice-sheer-color-brick-red-do-gach-24g.jpg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-duong-lipice-sheer-color-brick-red-do-gach-24g-1.webp?alt=media&token=08503250-e0a0-425e-8126-4b11d31ff864",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son dưỡng",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Sáp Tẩy Trang Banila Co Zero Original Cho Mọi Loại Da 100ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2F1687247909430-sap-tay-trang-banila-co-original-cho-moi-loai-da-100ml-9.webp?alt=media&token=e1288d9a-bf31-4d03-90fc-5f0a20a7437e",
    price: 315000,
    cost: 220500,
    percentDiscount: 29,
    originalPrice: 406350,
    numberAvailable: 200,
    description:
      '<p>Nếu bạn đang tìm kiếm một loại tẩy trang có thể làm sạch và dưỡng ẩm chỉ trong một bước thì không thể bỏ qua Sáp Tẩy Trang Banila Co Original Cho Mọi Loại Da 100ml.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/06/images/products/1687247838334-sap-tay-trang-banila-co-original-cho-moi-loai-da-100ml-3.jpeg"></p><p>Sáp Tẩy Trang Banila Co Original Cho Mọi Loại Da 100ml đến từ thương hiệu chăm sóc da nổi tiếng Hàn Quốc Banila Co. Sản phẩm đã gây được ấn tượng mạnh với công chúng khi liên tục đón nhận những cơn mưa giải thưởng dành cho hạng mục sáp tẩy trang tại các lễ trao giải Hàn như Unpa Beauty Review Winners, Hwahae Beauty Awards,...</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/06/images/products/1687247848572-sap-tay-trang-banila-co-original-cho-moi-loai-da-100ml-4.jpeg"></p><p>Sáp tẩy trang Banila Co nổi bật với công nghệ Zero Balance độc quyền của hãng, theo đó, các chất dưỡng ẩm và chất dinh dưỡng cần thiết cho da tạo thành hàng rào bảo vệ vững chắc, giữ cho làn da ẩm mượt mà không gây khô căng khi sử dụng. Thêm vào đó, sản phẩm còn sử dụng công thức chứa các thành phần có nguồn gốc thực vật, giúp nuôi dưỡng làn da khỏe mạnh.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/06/images/products/1687247858087-sap-tay-trang-banila-co-original-cho-moi-loai-da-100ml-6.jpeg"></p><p>Tẩy trang Banila Co Clean it Zero Cleansing Balm Original có kết cấu dạng sáp, nhẹ nhàng tan chảy vào da, giúp làm sạch kỹ lưỡng mà không gây kích ứng. Sản phẩm giúp làm sạch da chuyên sâu một cách hiệu quả mà không làm ảnh hưởng đến sự cân bằng độ ẩm tự nhiên của da.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/06/images/products/1687247869643-sap-tay-trang-banila-co-original-cho-moi-loai-da-100ml-1.jpeg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2F1687247916224-sap-tay-trang-banila-co-original-cho-moi-loai-da-100ml-3.jpeg?alt=media&token=c6844f78-4217-4c48-a9b0-56551815d6d1",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2F1687247918855-sap-tay-trang-banila-co-original-cho-moi-loai-da-100ml-2.jpeg?alt=media&token=2a7148e4-23d7-47f1-87b6-53be21cf4289",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Làm sạch",
    producerId: "Hada Labo",
  },
  {
    nameProduct:
      "Serum Neutrogena Hydroboost Niacinamide Dưỡng Ẩm Đều Màu Da 30ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fserum-neutrogena-hydroboost-niacinamide-duong-am-deu-mau-da-30ml-5.jpg?alt=media&token=e773332d-d30d-4e5a-953a-8ee7c0ea4393",
    price: 490000,
    cost: 343000,
    percentDiscount: 22,
    originalPrice: 597800,
    numberAvailable: 500,
    description:
      '<p>Serum Neutrogena Hydroboost Niacinamide Dưỡng Ẩm Đều Màu Da 30ml là sản phẩm đến từ thương hiệu Neutrogena.&nbsp;</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/serum-neutrogena-hydroboost-niacinamide-duong-am-deu-mau-da-30ml-3.jpg"></p><p>Sản phẩm nổi bật với thành phần 10% Niacinamide giúp làm sáng đều màu da. Thêm vào đó, thành phần Hyaluronic Acid (HA) và N-Acetyl Glucosamine (NAG) sẽ giúp dưỡng ẩm, cho da mềm mại, mướt mịn.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/serum-neutrogena-hydroboost-niacinamide-duong-am-deu-mau-da-30ml-2.jpg"></p><p>Qua kiểm nghiệm, sản phẩm cho hiệu quả trên da rõ rệt. Cụ thể:</p><p>- Làm se khít lỗ chân lông trong vòng 4 tuần.&nbsp;</p><p>- 87% người sử dụng cảm thấy da ẩm mượt hơn.</p><p>- 81% người dùng đồng ý serum giúp da trông mịn màng hơn.</p><p>- 82% người tham gia cho biết da trông mịn màng hơn.&nbsp;</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/serum-neutrogena-hydroboost-niacinamide-duong-am-deu-mau-da-30ml-4.jpg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-b9d04.appspot.com/o/images%2Fserum-neutrogena-hydroboost-niacinamide-duong-am-deu-mau-da-30ml-3.jpg?alt=media&token=e5c1bd19-4763-46cb-bb36-3b1b9655c616",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Chăm sóc da",
    producerId: "REN Clean Skincare",
  },
  {
    nameProduct:
      "Dung Dịch Chấm Mụn Cocoon Bí Đao Winter Melon Acne Super Drops Làm Giảm Mụn (Mới) 5ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fdung-dich-cham-mun-cocoon-bi-dao-winter-melon-acne-super-drops-lam-giam-mun-moi-5ml.webp?alt=media&token=d181a5a1-e4ea-4bd7-a5e1-5a0cf7e29d7f",
    price: 125000,
    cost: 87500,
    percentDiscount: 38,
    originalPrice: 172500,
    numberAvailable: 900,
    description:
      '<h2>Mô tả sản phẩm</h2><p>Cocoon là thương hiệu mỹ phẩm chăm sóc da đến từ Việt Nam, nổi tiếng với các sản phẩm có thành phần chính chiết xuất từ thiên nhiên lành tính, an toàn cho da. Mới đây, hãng đã cho ra mắt sản phẩm Dung Dịch Chấm Mụn Bí Đao Cocoon Winter Melon Acne Super Drops 5ml, giúp các nàng xua tan nỗi lo về mụn.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/11/images/products/1668424515516-dung-dich-cham-mun-bi-dao-cocoon-5ml.jpeg"></p><p>Dung Dịch Chấm Mụn Bí Đao Cocoon 5ml nổi bật với thành phần chính chiết xuất bí đao 100% từ thiên nhiên. Bí đao có chứa nhiều amino acid, mucins, muối khoáng, vitamin B và C,... giúp chống oxy hóa, làm mát da, kháng viêm, kháng khuẩn, hỗ trợ trị mụn viêm, mụn trứng cá. Chiết xuất rau má giúp tăng cường khả năng làm mát và dịu da, kháng viêm, kháng khuẩn, cải thiện kết cấu làn da của sản phẩm. Tinh dầu tràm trà giúp làm giảm sưng viêm, mụn trứng cá. Cuối cùng, Azeclair™ với nồng độ 20% giúp cân bằng lượng dầu trên da, làm sạch da, cho da thông thoáng, từ đó, ngăn ngừa sự phát triển của vi khuẩn gây mụn, làm sáng da, tạo lớp hàng rào bảo vệ da.</p><p><br></p><p><br></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/11/images/products/1668424519266-dung-dich-cham-mun-bi-dao-cocoon-5ml-1.jpeg"></p><p><br></p><p><br></p><p>Cocoon Winter Melon Acne Super Drops có kết cấu dạng lỏng, thẩm thấu nhanh vào da, không gây bết dính, không làm bít tắc lỗ chân lông. Sản phẩm cho hiệu quả giảm sưng viêm chỉ sau 3-5 ngày. Dung Dịch Chấm Mụn Cocoon chứa các thành phần tự nhiên, lành tính, an toàn cho da, không gây kích ứng, rất phù hợp với làn da mụn.</p><p>Hiện Dung Dịch Chấm Mụn Bí Đao Cocoon đang được phân phối tại Cocolux đồng thời mã cũ và mã mới.</p><p><strong>Dung Dịch Chấm Mụn Cocoon Bí Đao Winter Melon Acne Super Drops Làm Giảm Mụn (Mới) 5ml</strong></p><p><strong><img src="https://cocolux.com/storage/upload_image/images/dung-dich-cham-mun-cocoon-bi-dao-winter-melon-acne-super-drops-lam-giam-mun-moi-5ml.jpg"></strong></p><p>Dung Dịch Chấm Mụn Bí Đao Cocoon 5ml:</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/11/images/products/1668424523406-dung-dich-cham-mun-bi-dao-cocoon-5ml-2.jpeg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fdung-dich-cham-mun-cocoon-bi-dao-winter-melon-acne-super-drops-lam-giam-mun-moi-5ml-4.jpg?alt=media&token=edf91696-c32d-4d46-b0b1-b788c178f6dc",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fdung-dich-cham-mun-cocoon-bi-dao-winter-melon-acne-super-drops-lam-giam-mun-moi-5ml-1.jpg?alt=media&token=7d4461ad-905d-4c87-a966-c99931fad76a",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trị mụn",
    producerId: "Dior",
  },
  {
    nameProduct:
      "Sữa Rửa Mặt Senka Perfect Whip Low pH Calming Cica Cho Da Nhạy Cảm 100g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-rua-mat-senka-perfect-whip-low-ph-calming-cica-cho-da-nhay-cam-5.jpg?alt=media&token=623ee4a8-bd5b-4dae-921b-dd7a248ce089",
    price: 120000,
    cost: 84000,
    percentDiscount: 44,
    originalPrice: 172800,
    numberAvailable: 40,
    description:
      '<p>Sữa Rửa Mặt Senka Perfect Whip Low pH Calming Cica Cho Da Nhạy Cảm 100g đến từ thương hiệu mỹ phẩm chăm sóc da nổi tiếng Senka. Sản phẩm chứa nhiều thành phần có lợi cho da, tiêu biểu là chiết xuất rau má, chiết xuất đậu nành Nhật Bản, Hyaluronic Acid gấp 2 lần và chiết xuất tơ tằm trắng giúp dưỡng ẩm, làm dịu da, dưỡng da mềm mại, mịn màng.<img src="https://cocolux.com/storage/upload_image/images/huyen/2603/sua-rua-mat-senka-perfect-whip-low-ph-calming-cica-cho-da-nhay-cam-2.jpg"></p><p>Senka Perfect Whip Low pH Calming Cica có khả năng tạo bọt mịn tốt, giúp làm sạch nhẹ nhàng mà vẫn hiệu quả, không làm khô da, không làm ảnh hưởng đến lớp hàng rào bảo vệ da. Sản phẩm có độ pH thấp, là mức lý tưởng để da duy trì được độ ẩm cần thiết.&nbsp;</p><p><br></p>',
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Đặc trị",
    producerId: "Sao Thái Dương",
  },
  {
    nameProduct: "Miếng Dán Bioré Lột Mụn Mũi Hương Hoa Anh Đào 4PCS",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1668830902247-mieng-dan-mui-lot-mun-biore-huong-hoa-anh-dao-3.webp?alt=media&token=d54fa152-02b2-4f2f-a136-412d696a0341",
    price: 25000,
    cost: 17500,
    percentDiscount: 64,
    originalPrice: 41000,
    numberAvailable: 300,
    description:
      '<p>Dùng tay nặn mụn cám, mụn đầu đen là một thói quen không tốt, có thể ảnh hưởng đến sức khỏe làn da. Hiện nay, phương pháp loại bỏ mụn được ưa chuộng, tiết kiệm, có hiệu quả chính là sử dụng miếng dán lột mụn. Nếu bạn đang tìm kiếm một sản phẩm lột mụn chất lượng thì Miếng Dán Mũi Lột Mụn Bioré chính là sự lựa chọn thích hợp.</p><p>Miếng Dán Mũi Lột Mụn Bioré&nbsp;đến từ thương hiệu chăm sóc da Nhật Bản Bioré. Sản phẩm có thành phần chính là chiết xuất cây Phỉ giúp làm se khít lỗ chân lông, dưỡng da mịn màng sau lột. Bioré Pore Pack có thiết kế với nhiều đường xẻ có khả năng bám dính tốt vào vùng da nơi cánh mũi, giúp dễ dàng loại bỏ mụn đầu đen, mụn cám, sợi bã nhờn trên da. Sản phẩm giúp loại bỏ nhân mụn, làm xẹp mụn tốt, cho làn da sạch sâu, mịn màng, bừng sáng.</p><p><strong>Miếng Dán Mũi Lột Mụn Bioré - Hương Hoa Anh Đào</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/11/images/products/1668830823025-mieng-dan-mui-lot-mun-biore-huong-hoa-anh-dao.jpeg"></p><p>Miếng Dán Mũi Lột Mụn Bioré - Hương Hoa Anh Đào nổi bật với hương hoa anh đào thơm mát, dịu nhẹ giúp bạn thư giãn, thoải mái khi sử dụng sản phẩm.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/11/images/products/1668830830426-mieng-dan-mui-lot-mun-biore-huong-hoa-anh-dao-1.jpeg"></p><p><strong>Miếng Dán Mũi Lột Mụn Bioré - Than Hoạt Tính</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/11/images/products/1668830837301-mieng-dan-mui-lot-mun-biore-than-hoat-tinh.jpeg"></p><p>Miếng Dán Mũi Lột Mụn Bioré - Than Hoạt Tính có thành phần chính là hoạt chất than hoạt tính giúp làm sạch nhờn gấp 3 lần so với thông thường.</p><p><strong>Miếng Dán Mũi Lột Mụn Bioré Không Hương</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/11/images/products/1668830845807-mieng-dan-mui-lot-mun-biore-khong-huong.jpeg"></p><p>Miếng Dán Mũi Lột Mụn Bioré Không Hương là loại nguyên bản, không chứa hương thơm, thích hợp cho những nàng không thích hoặc dị ứng với mùi hương trên các sản phẩm chăm sóc da.&nbsp;</p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1668830912214-mieng-dan-mui-lot-mun-biore-huong-hoa-anh-dao-2.jpeg?alt=media&token=aa38c595-c2d6-49ae-87d4-f801738f0fa3",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1668830925332-mieng-dan-mui-lot-mun-biore.jpeg?alt=media&token=a8a8ebf4-d1d9-4c75-89d4-59a66b5cbb5c",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trị mụn",
    producerId: "L'Oréal",
  },
  {
    nameProduct:
      "Tinh Chất Eucerin Pro Acne Solution Super Serum Giảm Mụn Trứng Cá Mờ Sẹo 30ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1632970367949-tinh-chat-tri-mun-trung-ca-mo-seo-eucerin-proacne-30ml.webp?alt=media&token=a772599b-272c-4514-b0e1-60ed35d9d66e",
    price: 540000,
    cost: 378000,
    percentDiscount: 67,
    originalPrice: 901800,
    numberAvailable: 89,
    description: null,
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1662902318397-tinh-chat-tri-mun-trung-ca-mo-seo-eucerin-proacne-30ml-7.jpeg?alt=media&token=7987af2f-3cfa-4d67-b41e-ca8f23a46cc7",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trị mụn",
    producerId: "L'Oréal",
  },
  {
    nameProduct: "Set Trị Nám Trắng Da Dongsung Rannce Premium Skin Care",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1634627930048-set-tri-nam-trang-da-dongsung.webp?alt=media&token=248234ce-ed05-49b8-aeff-82687acbad8c",
    price: 1490000,
    cost: 1042999,
    percentDiscount: 29,
    originalPrice: 1922099,
    numberAvailable: 35,
    description:
      '<p>Bộ Sản Phẩm Trị Nám Trắng Da&nbsp;<a href="https://cocolux.com/thuong-hieu/dongsung-i.374" rel="noopener noreferrer" target="_blank"><strong>Dongsung</strong></a>&nbsp;Rannce Premium Skin Care Set được chắt lọc từ những tinh hoa quý giá cũng như sự dày công nghiên cứu mà dòng Dongsung trị nám đã và đang mang đến một tia hi vọng mới dành cho chị em. Bởi sản phẩm không những đánh bật được gốc nám dù là nám lâu năm mà còn giúp nuôi dưỡng tái tạo làn da mịn màng và trắng hồng. Nên sử dụng trọn bộ sản phẩm để có được hiệu quả tốt nhất.</p>',
    properties: {},
    gallery: [],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Trị sẹo",
    producerId: "Sao Thái Dương",
  },
  {
    nameProduct: "Dầu Xả 50 Megumi Sạch Sâu Thanh Mát 400ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1631344943726-dau-xa-50-megumi-sach-sau-thanh-mat-toc-400ml-1.webp?alt=media&token=e5e0860d-2c30-4b7d-82be-c83712dcbd5c",
    price: 250000,
    cost: 175000,
    percentDiscount: 77,
    originalPrice: 442500,
    numberAvailable: 999,
    description:
      '<p>Bên cạnh dầu gội, dầu xả cũng là sản phẩm chăm sóc tóc cần thiết, không thể thiếu trong quá trình dưỡng tóc của mọi người. Sản phẩm giúp bổ sung các dưỡng chất, nuôi dưỡng mái tóc mềm mại, chắc khỏe. Nếu bạn đang muốn tìm kiếm một loại dầu xả dịu nhẹ, không chứa Silicone thì Dầu Xả 50 Megumi Sạch Sâu, Ngăn Ngừa Rụng Tóc 400ml chính là sự lựa chọn thích hợp.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/03/images/products/1678332390749-dau-xa-50-megumi-sach-sau-ngan-ngua-rung-toc-400ml.jpeg"></p><p><strong>Dầu Xả 50 Megumi Ngăn Ngừa Rụng Tóc 400ml</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/03/images/products/1678332400480-dau-xa-50-megumi-ngan-ngua-rung-toc-cho-toc-yeu-2.jpeg"></p><p>Dầu Xả 50 Megumi Ngăn Ngừa Rụng Tóc 400ml sở hữu công thức chứa hệ thảo mộc thiên nhiên, giàu dưỡng chất, giúp cải thiện tình trạng tóc gãy rụng, cải thiện nền tóc yếu, cung cấp các dưỡng chất nuôi dưỡng mái tóc chắc khỏe. Chiết xuất tảo biển, protein từ đậu nành và collagen giúp tăng cường bổ sung dưỡng chất, cho tóc thêm khỏe mạnh, bồng bềnh. Nhân sâm giúp tăng cường mọc tóc và giúp tóc nhanh dài hơn. Thêm vào đó, sản phẩm còn chứa hệ dầu dưỡng từ thiên nhiên gồm Olive, Jojoba, Argan và hạt hướng dương, giúp dưỡng ẩm cho mái tóc bóng mượt, mềm mại.</p><p><strong>Dầu Xả 50 Megumi Sạch Sâu Thanh Mát 400ml</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/03/images/products/1678332442633-dau-xa-50-megumi-ssach-sau-thanh-mat-400ml-1.jpeg"></p><p>Dầu Xả 50 Megumi Sạch Sâu Thanh Mát 400ml chứa nhiều thành phần có nguồn gốc từ thiên nhiên. Thành phần chính và đặc sắc nhất đó chính là tinh chất bạc hà giúp làm sạch tóc và da dầu, ngăn ngừa tình trạng tóc bết dính, mang lại cảm giác mát lạnh, thoải mái sau khi sử dụng. Chiết xuất các loại tảo biển giúp kiểm soát bã nhờn, cho mái tóc luôn bồng bềnh, thoải mái suốt nhiều giờ liền. Nhân sâm giúp tóc mọc nhanh, nhiều và dài hơn. Ngoài ra, sản phẩm còn chứa chiết xuất tinh dầu thực vật thiên nhiên giúp dưỡng tóc mềm ẩm, nuôi dưỡng mái tóc chắc khỏe.</p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1631344950030-dau-xa-50-megumi-sach-sau-thanh-mat-toc-400ml-6.jpeg?alt=media&token=1a8932b8-9ffd-4e2c-9263-54b89b74f035",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1631344950315-dau-xa-50-megumi-sach-sau-thanh-mat-toc-400ml-3.jpeg?alt=media&token=6d9a5d58-e12c-4598-bc8f-5b5a70150f5e",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Làm sạch cơ thể",
    producerId: "Holika Holika",
  },
  {
    nameProduct: "Nước Uống Shiseido The Collagen 50ml x 10 PCS NEW",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-uong-collagen-shiseido-50ml-x-10-lo-new.webp?alt=media&token=2c269b1d-5b23-40af-b360-ec80af1ed30f",
    price: 515000,
    cost: 360500,
    percentDiscount: 71,
    originalPrice: 880650,
    numberAvailable: 1000,
    description:
      '<p>Collagen là một loại protein quan trọng trong cơ thể con người nói chung, làn da nói riêng. Hợp chất này chiếm tới 70% toàn bộ cấu trúc da, có tác dụng hỗ trợ liên kết lớp biểu bì và hạ bì, chống lão hóa, cho da săn chắc, mịn màng. Việc thiếu collagen sẽ khiến cho da mất đi độ đàn hồi, săn chắc vốn có, hình thành nếp nhăn và dễ bị tổn thương hơn. Hiểu được điều đó, thương hiệu dược phẩm nổi tiếng tại Nhật Bản Shiseido đã cho ra mắt dòng sản phẩm Nước Uống The Collagen Shiseido.</p><p>Hiện&nbsp;Nước Uống Shiseido The Collagen 50ml x 10 PCS đang được phân phối tại Cocolux cả mẫu cũ và mẫu mới:</p><p><strong>Nước Uống Shiseido The Collagen 50ml x 10 PCS</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/08/images/products/1660029565561-nuoc-uong-colagen-shiseido-2.jpeg"></p><p><strong>Nước Uống Shiseido The Collagen 50ml x 10 PCS NEW</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/nuoc-uong-collagen-shiseido-50ml-x-10-lo-new-1(1).jpg"></p><p>Nước Uống The Collagen Shiseido có chứa các thành phần chiết xuất từ trái cây, được tuyển chọn cẩn thận và kỹ càng như collagen trọng lượng phân tử thấp, axit hyaluronic, ceramide và vitamin C,... Đây là sản phẩm làm đẹp dạng đường uống, giúp bổ sung collagen và nuôi dưỡng làn da từ sâu bên trong.&nbsp;</p><p>Sản phẩm đã qua nhiều lần cải tiến. Phiên bản 2020 của The Collagen Shiseido được ra mắt vào ngày 21/03/2019 với các điểm nổi trội như hàm lượng vitamin C, Ceramide, Hyaluronic Acid cũng được tăng gấp 2 lần so với phiên bản cũ, bổ sung thêm các thành phần làm đẹp có nguồn gốc từ trái cây như chiết xuất quýt Satsuma Nhật Bản. Mục đích của Shiseido là hướng tới một làn da với vẻ đẹp 4D hoàn hảo, không góc chết.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/08/images/products/1660029576194-nuoc-uong-colagen-shiseido-3.jpeg"></p><p>Nước Uống The Collagen Shiseido có hương trái cây thơm ngon, dễ uống, đem đến hàm lượng collagen cao, tốt cho sức khỏe và làn da. Từ đó, cải thiện tình trạng da, chống lão hóa, giảm thiểu nếp nhăn trên da, cho da khỏe mạnh, rạng rỡ. Sản phẩm có lượng calo thấp, không chứa caffeine, không chứa chất béo, vì thế các bạn hoàn toàn có thể yên tâm sử dụng sản phẩm.</p><p><br></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-uong-collagen-shiseido-50ml-x-10-lo-new-1.jpg?alt=media&token=ebcfe94b-df3d-4be2-9a6c-ce3171e73541",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Thực phẩm chức năng",
    producerId: "REN Clean Skincare",
  },
  {
    nameProduct: "Nước Uống Blossomy 50ml 3 PCS",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1648547235597-nuoc-uong-dep-da-cai-thien-suc-khoe-blossomy-50mlx3.webp?alt=media&token=befb62fa-8343-4838-a7e9-f9a1439927d5",
    price: 365000,
    cost: 255499,
    percentDiscount: 3,
    originalPrice: 375950,
    numberAvailable: 2000,
    description:
      "<p>Đối với chị em phụ nữ, một sản phẩm vừa có khả năng tăng cường sức khỏe vừa có công dụng cải thiện nhan sắc như&nbsp;<strong>Nước Uống BLOSSOMY 3 chai x 50ml</strong>&nbsp;được xem là giải pháp tối ưu giúp nâng cao chất lượng cuộc sống. Đây là dòng thực phẩm chức năng có xuất xứ từ Nhật Bản và rất được ưa chuộng tại thị trường Việt Nam.</p><p><br></p><p>Sở hữu nhiều công dụng làm đẹp như tăng cường đàn hồi, làm đầy nếp nhăn, giúp da săn chắc, láng mịn, đồng thời ngăn ngừa nguy cơ lão hóa da, sản phẩm giúp chị em phụ nữ cải thiện làn da thiếu sức sống một cách hiệu quả, đem lại vẻ đẹp trẻ trung, rạng rỡ, giúp nàng thêm tự tin.&nbsp;</p><p>Đồng thời, nước uống Blossomy còn có khả năng cải thiện các vấn đề về tiêu hóa, dạ dày, giúp người dùng giảm căng thẳng, stress, hỗ trợ làm giảm rối loạn giấc ngủ, đem đến những đêm ngon giấc, ngủ sâu hơn, tinh thần sảng khoái, lạc quan.&nbsp;</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1659931632300-nuoc-uong-blossomy-3-chai-x-50ml-4.jpeg?alt=media&token=1bf04787-a95d-4159-b087-e51c9d4f7747",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1659931635185-nuoc-uong-blossomy-3-chai-x-50ml-5.png?alt=media&token=205493ab-bf1b-4d3f-af63-3a3e1666c836",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Thực phẩm chức năng",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Nước Hoa Versace Eros EDT 50ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F8011003809202.webp?alt=media&token=2447d595-30c0-4805-a345-c7282d484be1",
    price: 1581000,
    cost: 1106700,
    percentDiscount: 58,
    originalPrice: 2497979,
    numberAvailable: 200,
    description:
      '<p>Versace là thương hiệu thời trang - nước hoa cao cấp nổi tiếng của nước Ý, được thành lập năm 1987 bởi ông hoàng giới thời trang Gianni Versace. Các sản phẩm của hãng trải dài từ trang phục, phụ kiện, nội thất cho đến nước hoa. Tất cả đều mang vẻ đẹp xa xỉ, độc nhất, mang dấu ấn đậm nét của Versace. Trong đó, nhắc đến dòng nước hoa nam, bạn không thể bỏ qua Nước Hoa Versace Eros EDT.</p><p>Nước Hoa Versace Eros EDT được ra mắt vào năm 2012 bởi nhà sáng chế nước hoa nổi tiếng Aurelien Guichard. Sản phẩm được lấy cảm hứng từ vị thần tình yêu Eros trong thần thoại Hy Lạp. Khi cho ra đời dòng nước hoa này, giám đốc điều hành của Versace, Donatella Versace chia sẻ: “Tôi đã tưởng tượng ra một người đàn ông anh hùng, đầy nhiệt huyết, gần như là một vị thần Hy Lạp. Hương thơm được tạo thành từ những nốt hương thể hiện sự gợi cảm và quyền lực, một sức mạnh tột độ của phái mạnh”.</p><p><br></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/04/images/products/1681957311210-nuoc-hoa-versace-eros-2.png"></p><p><br></p><p>Versace Eros EDT là một mùi hương gợi cảm, thuộc nhóm hương thơm thảo mộc, được kết hợp từ các nốt hương gỗ, phương Đông và tươi mát, tạo ra một loại nước hoa mạnh mẽ, đầy nam tính. Sản phẩm gồm 3 tầng hương thơm: mở đầu với hương thơm tươi mát, sảng khoái, không kém phần ngọt ngào từ bạc hà, tinh dầu chanh Ý và kẹo táo; hương giữa mang nét nồng nàn, dịu ngọt với hương hoa phong lữ, tinh chất cây xô thơm, hổ phách; cuối cùng là sự kết hợp đem đến sự ngọt thơm, ấm áp, quyến rũ của gỗ tuyết tùng vùng Atlas và Virginia, tinh chất cỏ Vetiver Orpur, hoắc hương Coeur Orpour, gỗ đàn hương và hương vani.</p><p>Nước Hoa Versace Eros EDT là sản phẩm có nồng độ Eau De Toilette, do đó, có khả năng lưu hương tới 10 giờ, cho phái mạnh hương thơm suốt cả ngày dài. Sản phẩm có thiết kế độc đáo, huyền bí, được lấy cảm hứng từ thần thoại Hy Lạp. Nước hoa được bao phủ bởi màu xanh dương từ biển cả. Thân chai có in hình ảnh Medusa - một nhân vật phản diện trong thần thoại Hy Lạp và cả La Mã, cùng những đường nét mê cung được bao bọc quanh thân chai, càng tôn thêm vẻ bí ẩn, thu hút. Phần nắp chai là sự kết hợp của màu xanh cùng màu vàng gold, càng tôn thêm sự quyền lực, sức thu hút của sản phẩm này.&nbsp;</p><p>Hiện Hoa Versace Eros EDT đang được phân phối tại Cocolux với 3 phân loại:</p><p>Nước Hoa Versace Eros EDT 100ml&nbsp;&nbsp;&nbsp;</p><p><br></p><p><img src="https://cocolux.com/storage/upload_image/images/nuoc-hoa-versace-eros-edt-100ml.jpg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-versace-eros-edt-50ml.jpg?alt=media&token=2a561d6a-628a-4635-9bf7-a407f10908f3",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-versace-eros-edt-50ml-2.jpg?alt=media&token=a1d71d26-688a-4c89-b02a-f6f6a8460d00",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa nam",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Nước Hoa Moschino Toy Boy EDP 100ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1673331736812-nuoc-hoa-moschino-toy-boy-edp-100ml-6.jpeg?alt=media&token=be525ce7-5c9b-4bea-9296-b6360decc1ff",
    price: 2076000,
    cost: 1453200,
    percentDiscount: 51,
    originalPrice: 3134760,
    numberAvailable: 899,
    description:
      "<p>Nước hoa là item không thể thiếu đối với cả nam lẫn nữ. Sản phẩm đem đến hương thơm cho cơ thể, giúp bạn thể hiện được cá tính, nét thu hút của bản thân. Nước Hoa Moschino Toy Boy EDP 100ml là nước hoa đến từ thương hiệu thời trang - nước hoa Italia nổi tiếng Moschino, dành riêng cho phái mạnh.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1673331736812-nuoc-hoa-moschino-toy-boy-edp-100ml-6.jpeg?alt=media&token=0d6ca7eb-37ab-483a-98ff-41deb41b0417",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1673331744661-nuoc-hoa-moschino-toy-boy-edp-100ml-1.jpeg?alt=media&token=b8ae32c2-161d-419a-83b9-8e17c4dac053",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa nam",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Nước Hoa Gucci Guilty Pour Homme EDT 150ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1665481888495-712d32f4-75a8-446b-93c8-8d1d5d62dfc7.webp?alt=media&token=b8f22bd4-4613-4e20-ae93-4b3f46df4aee",
    price: 3590000,
    cost: 2513000,
    percentDiscount: 54,
    originalPrice: 5528600,
    numberAvailable: 200,
    description:
      "<p>Nước hoa là một trong những sản phẩm làm đẹp giúp tạo hương thơm cho phái nữ lẫn phái nam. Không chỉ có vậy, nước hoa còn giúp phản ánh tâm trạng, tạo sức thu hút, thư giãn, cải thiện sức khỏe,... Đối với phái mạnh, nước hoa còn là trợ thủ đắc lực giúp khẳng định phong, cách, đẳng cấp. Nếu các chàng đang muốn tìm kiếm một hương nước hoa nam tính, trẻ trung, nhưng không kém phần sành điệu, mãnh liệt, gai góc thì Nước hoa Gucci Guilty Pour Homme EDP là một sự lựa chọn hoàn hảo.</p><p><br></p>",
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa nam",
    producerId: "Romand",
  },
  {
    nameProduct: "Nước Hoa Jimmy Choo Rose Passion EDP 60ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F3386460137553.webp?alt=media&token=f6263435-44a1-4664-b106-44bbd6b598ef",
    price: 1913000,
    cost: 1339100,
    percentDiscount: 30,
    originalPrice: 2486900,
    numberAvailable: 1000,
    description:
      '<p>Nếu nàng là một tín đồ của các mùi hương chắc chắn sẽ không còn xa lạ gì với cái tên Jimmy Choo - Thương hiệu nước hoa nổi tiếng được nhiều ngôi sao quốc tế yêu thích. Trong năm 2023, Jimmy Choo vừa ra mắt sản phẩm mới trong bộ sưu tập nước hoa cao cấp của họ, mang tên Rose Passion.</p><p><img src="https://cocolux.com/storage/upload_image/images/nuoc-hoa-jimmy-choo-rose-passion-edp.jpg"></p><p>Đây là một mùi hương khá độc đáo, kết hợp giữa sự quyến rũ, tự tin và một chút táo bạo giúp nàng thể hiện cá tính hoàn toàn mới của mình. Rose Passion lấy cảm hứng từ vẻ đẹp vĩnh cửu của bờ biển Riviera ở nước Pháp, nơi mà màu hồng (Rose trong tiếng Pháp) trở nên đặc biệt và lấp lánh. Hương thơm này mang đến cho nàng hình ảnh ánh nắng chiếu xuống biển Địa Trung Hải, trong khi giai điệu nhạc nhẹ nhàng đang vang lên.&nbsp;</p><p>Nước hoa Jimmy Choo Rose Passion EDP được tạo ra bởi nhà chế tạo nước hoa danh tiếng Nathalie Lorson. Hương thơm bắt đầu với sự tươi mát của nước dừa và hoa sứ nhiệt đới, trước khi chuyển sang sự nồng nàn của hoa lan và hoa nhài quyến rũ. Hương gỗ đàn hương làm cho mùi hương càng trở nên mãnh liệt, và vanilla mang đến một nét đặc biệt, tạo dấu ấn dài lâu cho hương thơm. Hương cuối cùng của Rose Passion mang lại cảm giác phấn khích và thăng hoa, tôn vinh sự lạc quan của các nàng thơ Jimmy Choo.&nbsp;</p><p>Ngoài hương thơm quyến rũ, thiết kế của chai nước hoa và bao bì cũng thể hiện sự độc đáo và khao khát mãnh liệt. Nước hoa Jimmy Choo Rose Passion EDP được đặt trong một hộp màu hồng fuchsia thời thượng với thiết kế nổi bật cùng tên thương hiệu Jimmy Choo.</p><p>Thiết kế bao bì được lấy cảm hứng từ vẻ đẹp của thủy tinh Murano Venice, giống như một viên ngọc quý được cắt gọt tinh xảo. Màu hồng fuchsia chuyển màu tạo ra ảo ảnh của một chai nước hoa rực rỡ. Nắp chai được thiết kế với hai màu đen và vàng sang trọng, tạo điểm nhấn tự tin, thể hiện sự quyến rũ và tinh xảo của hương thơm này.</p><p>Hiện tại, Nước hoa Jimmy Choo Rose Passion EDP đang được phân phối tại các cửa hàng của Cocolux với 3 dung tích:&nbsp;</p><p>100ml&nbsp;</p><p>60ml</p><p>40ml&nbsp;</p><p>Nàng còn chần chờ gì nữa mà không đến ngay cơ sở gần nhất của Cocolux để sở hữu cho mình một mùi hương độc đáo này.</p><p>Thông tin chi tiết của sản phẩm:&nbsp;</p><ul><li>Năm phát hành: 2023</li><li><br></li><li>Giới tính: Nữ</li><li><br></li><li>Dung tích: 100ml</li><li><br></li><li>Nồng độ: Eau De Parfum (EDP)</li><li><br></li><li>Nhóm hương: Floral - Nhóm hương hoa cỏ</li><li><br></li><li>Độ lưu hương: Lên tới 6 tiếng đồng hồ</li><li><br></li><li>Độ tỏa hương: Rất xa, toả hương trong vòng bán kính &gt; 2m</li><li><br></li><li>Phong cách: Quyến rũ, tự tin</li></ul><p><br></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-jimmy-choo-rose-passion-edp-60ml-1.jpg?alt=media&token=4ce9a2f5-2bca-4468-8992-31bb343c0549",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-jimmy-choo-rose-passion-edp-60ml-2.jpg?alt=media&token=d3f45920-b26c-4267-8498-128f97df75c4",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa nữ",
    producerId: "L'Oréal",
  },
  {
    nameProduct: "Tẩy Tế Bào Chết Body Tree Hut Shea Sugar Scrub Vanilla 510g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F075371002946.webp?alt=media&token=fae0d1df-4822-49c7-bfee-f94c3c5e63e2",
    price: 299000,
    cost: 209300,
    percentDiscount: 83,
    originalPrice: 547170,
    numberAvailable: 300,
    description:
      '<p>Tẩy da chết là bước chăm sóc da không thể thiếu nếu bạn muốn sở hữu một làn da sáng mịn, khỏe khoắn. Nếu bạn đang muốn sở hữu làn da body sạch thoáng, mịn màng thì tuyệt đối không nên bỏ qua sản phẩm <strong>Tẩy tế bào chết Shea Sugar Scrub.</strong></p><p><br></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/11/images/products/1669176283617-tay-te-bao-chet-body-shea-sugar-scrub-510g.jpeg"></p><p><br></p><p>Đây là dòng tẩy tế bào chết dành riêng cho làn da body, chứa các hạt đường mịn giúp làm sạch nhẹ nhàng các tế bào chết, bụi bẩn, bã nhờn trên da, đồng thời làm khô thoáng lỗ chân lông mà không gây tổn thương da. Sản phẩm chứa nhiều thành phần có chiết xuất tự nhiên như dừa, cam, chanh, dứa, tinh dầu hoa rum, bơ hạt mỡ,... giúp tăng cường hiệu quả dưỡng da một cách an toàn, lành tính.&nbsp;</p><p>Không chỉ làm sạch da, tẩy tế bào chết body của Tree Hut còn giúp làm sáng da và duy trì độ mềm mại, mịn màng tự nhiên. Hiện nay, sản phẩm đã có mặt tại hệ thống cửa hàng của Cocolux với các phân loại 510g, 255g sau:&nbsp;</p><p>Tâ<strong>̉y tế bào chết Shea Sugar Scrub - Vitamin</strong> C: </p><p>Viatmin C dưỡng sáng da, kháng khuẩn hiệu quả.&nbsp;</p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Ftay-te-bao-chet-body-tree-hut-shea-sugar-scrub-vanilla-510g-3.jpg?alt=media&token=0758255f-e6b6-4d70-8560-e575e391e543",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Tẩy da chết body",
    producerId: "Hada Labo",
  },
  {
    nameProduct: "Nước Hoa Bergamo Màu Tím Oscar Violet PerFume",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-bergamo-mau-tim-oscar-violet-perfume-1.webp?alt=media&token=ce493aa7-c43a-435b-ac63-39a45fd7b84e",
    price: 215000,
    cost: 150500,
    percentDiscount: 11,
    originalPrice: 238650,
    numberAvailable: 200,
    description:
      '<p>Nước hoa Bergamo màu tím Oscar Violet Perfume mang trong mình sự kết hợp tinh tế giữa nghệ thuật và thẩm mỹ, đem đến cho người dùng một trải nghiệm hương thơm đầy sức hút, cuốn hút. Được sản xuất bởi thương hiệu mỹ phẩm uy tín Bergamo, sản phẩm không chỉ nổi bật với thiết kế lạ mắt mà còn chứa đựng một hương thơm nữ tính, quyến rũ.</p><p><img src="https://cocolux.com/storage/upload_image/images/nuoc-hoa-bergamo-mau-tim-oscar-violet-perfume-1.jpg"></p><p>&nbsp;</p><ul><li><strong>Hương đầu</strong>: Sự pha trộn của quả bưởi đỏ và quả cam, tạo nên một cảm giác tươi mát, cuốn hút.</li><li><strong>Hương giữa</strong>: Mang lại sự nhẹ nhàng và lịch lãm của hoa diên vĩ, với một chút ngọt ngào.</li><li><strong>Hương cuối:</strong> Sự kết hợp ấm áp của xạ hương và hương gỗ, tạo ra một cảm giác ấm áp, quyến rũ.</li></ul><p>Không chỉ là một món quà hoàn hảo trong những dịp đặc biệt, nước hoa Bergamo màu tím Oscar Violet Perfume còn là người bạn đồng hành lý tưởng cho những ngày thường, từ công việc đến giải trí. Với khả năng giữ hương lên đến 6 tiếng,&nbsp;Oscar Violet Perfume giúp bạn tự tin, quyến rũ suốt cả ngày dài.</p><p><img src="https://cocolux.com/storage/upload_image/images/nuoc-hoa-bergamo-mau-tim-oscar-violet-perfume.jpg"></p><p>Cho dù bạn là người yêu thích sự tinh tế và lịch lãm, hay đang tìm kiếm một mùi hương dịu dàng, quyến rũ, nước hoa Bergamo màu tím Oscar Violet Perfume là sự lựa chọn không thể bỏ qua. Hãy để mình đắm chìm trong một cảm giác mới mẻ, cuốn hút với sản phẩm này từ Bergamo - một biểu tượng của sự sang trọng, quý phái.</p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-bergamo-mau-tim-oscar-violet-perfume-3.jpg?alt=media&token=512a7717-e2f5-4ee5-a80b-e6754f01391a",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-bergamo-mau-tim-oscar-violet-perfume-5.jpg?alt=media&token=866ef3a5-e7eb-4a55-9206-bea8dbc52abe",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-bergamo-mau-tim-oscar-violet-perfume-2.jpg?alt=media&token=976ee843-4543-4262-be48-d89c26b99c12",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa nữ",
    producerId: "Dior",
  },
  {
    nameProduct: "Nước Hoa Gucci Bloom Ambrosia Di Fiori EDP ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-gucci-bloom-ambrosia-di-fiori-50ml.jpg?alt=media&token=2ef3a531-8e8c-46d5-a5b1-acfb05bfe2e5",
    price: 2882000,
    cost: 2017399,
    percentDiscount: 43,
    originalPrice: 4121260,
    numberAvailable: 200,
    description:
      '<p>Gucci là thương hiệu thời trang cao cấp đến từ nước Ý. Không chỉ làm nên tên tuổi ở thị trường thời trang, Gucci còn gây ấn tượng với những dòng nước hoa sang chảnh, chất lượng bậc nhất. Một trong số đó, không thể không kể đến Nước Hoa Gucci Bloom Ambrosia Di Fiori.</p><p><br></p><p><br></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/02/images/products/1675934631413-nuoc-hoa-gucci-bloom-ambrosia-di-fiori-1.jpeg"></p><p><br></p><p><br></p><p>Nước Hoa Gucci Bloom Ambrosia Di Fiori được xem là một chương mới trong câu chuyện nước hoa Gucci Bloom do nhà thiết kế Alessandro Michele sáng tạo ra. Gucci Bloom Ambrosia Di Fiori được làm nên bởi bậc thầy nước hoa Alberto Morillas vào năm 2019. Theo thần thoại Hy Lạp, “Ambrosia” là một loại mật hoa được dùng trong bữa ăn của các vị thần, có khả năng đem lại sự bất tử cho những ai thưởng thức nó. Lấy cảm hứng từ loài hoa trong thần thoại này, Gucci đã dệt nên một bó hoa rực rỡ của mùi hương trong Nước Hoa Gucci Bloom Ambrosia Di Fiori.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2023/02/images/products/1675934622071-nuoc-hoa-gucci-bloom-ambrosia-di-fiori-2.jpeg"></p><p><br></p><p><br></p><p>Gucci Bloom Ambrosia Di Fiori mang nồng độ Eau de Parfums, có khả năng đem đến hương thơm trong nhiều giờ liền mà không quá nồng, đem lại cảm giác dễ chịu, thoải mái khi sử dụng. Hương thơm của Bloom Ambrosia Di Fiori là sự kết hợp của bộ ba loài hoa gồm nụ hoa nhài, hoa huệ trắng và sử quân tử.</p><p>Thêm vào đó, sự xuất hiện của các thành phần hoa độc đáo khác giúp làm tăng hương thơm cho nước hoa. Cụ thể, đó là hoa Velvety Orris quý hiếm, có nguồn gốc từ hoa diên vĩ, được người Hy Lạp và La Mã cổ đại sử dụng dưới dạng tinh dầu; hoa hồng Damask được thu hoạch vào sáng sớm nhằm giữ được hương thơm nguyên bản và mạnh mẽ nhất của loài hoa này; nụ hoa nhài được điều chế bằng phương pháp độc quyền của Gucci, đem đến mùi hương tươi mát và nhẹ dịu trên da.</p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-gucci-bloom-ambrosia-di-fiori-50ml.jpg?alt=media&token=584a743c-53de-4f8b-84f7-9eed595b3ec6",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-gucci-bloom-ambrosia-di-fiori-50ml-1.jpg?alt=media&token=b452845f-a3f1-435d-9be9-4a30e901d1c4",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa nữ",
    producerId: "Dior",
  },
  {
    nameProduct: "Sữa Tắm Bioré Dưỡng Ẩm - Hương Đào 530g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-biore-duong-am-huong-dao-530g%20(2).webp?alt=media&token=4bf4ccd2-7ed2-42dd-92c1-548f91e0e05b",
    price: 102000,
    cost: 71400,
    percentDiscount: 63,
    originalPrice: 166260,
    numberAvailable: 100,
    description:
      '<p>Bioré là thương hiệu chăm sóc da dành cho nữ giới quen thuộc tại hầu hết các nước Châu Á và Châu Âu như Anh, Pháp, Hà Lan, Thái Lan, Singapore… trong đó có cả Việt Nam. Các dòng sản phẩm của thương hiệu này với đa dạng chủng loại từ sữa rửa mặt, nước tẩy trang, kem chống nắng… đáp ứng được nhu cầu làm đẹp đa dạng của chị em phụ nữ. Trong số đó, không thể bỏ qua ​​​​<strong>Sữa tắm Dưỡng Ẩm Bioré&nbsp;</strong>giúp nhẹ nhàng làm sạch sâu và duy trì độ căng mướt cho làn da.</p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/08/images/products/1660535689671-1632542010416-sua-tam-biore-mat-diu-sang-khoai-530g.png"></p><p><img src="https://cocolux.com/storage/upload_image/images/cdn_images/2022/08/images/products/1660535742103-Picture6.jpeg"></p><p>Sữa tắm Dưỡng Ẩm Bioré nổi bật với công nghệ Khóa Ẩm độc đáo giúp giữ lại độ ẩm tự nhiên, để làn da luôn mịn màng và căng sáng. Thêm vào đó, các chiết xuất Sữa Chua từ Nhật Bản có trong sản phẩm giúp làm sáng, cải thiện các vấn đề về da khô ráp, sần sùi và không đều màu một cách hiệu quả.&nbsp;</p><p><br></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-biore-duong-am-huong-dao-530g%20(3).jpg?alt=media&token=68a84b49-399f-4b98-800e-91f345518d2f",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-biore-duong-am-huong-dao-530g.jpg?alt=media&token=fe01af44-3bd4-4a2a-8632-0bb5fd2bc92f",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Sữa tắm",
    producerId: "Hada Labo",
  },
  {
    nameProduct: "Son Thỏi Tom Ford - 93 Invite Only",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2FSon%20Th%E1%BB%8Fi%20Tom%20Ford%20-%2093%20Invite%20Only%20(3).jpg?alt=media&token=0949ad2e-8864-4bce-a846-561d172beb1e",
    price: 850000,
    cost: 595000,
    percentDiscount: 87,
    originalPrice: 1589500,
    numberAvailable: 123,
    description:
      "<p><strong>Son Thỏi Tom Ford Lip Color Satin Matte</strong>&nbsp;là dòng son được đánh giá có độ che phủ cao, chất son mềm mịn, sở hữu bảng màu vô cùng xuất sắc. Đồng thời với thành phần có chứa collagen và tinh chất từ biển, đây là dòng sản phẩm có khả năng cấp ẩm tuyệt vời, giúp đôi môi luôn trong trạng thái căng tràn sức sống.&nbsp;</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2FSon%20Th%E1%BB%8Fi%20Tom%20Ford%20-%2093%20Invite%20Only%20(4).jpg?alt=media&token=34fe645b-74c1-49bc-95e5-534ac33e0c02",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son thỏi",
    producerId: "MAC Cosmetics",
  },
  {
    nameProduct: "Sữa Tắm Arumore AHA BHA PHA Body Wash 500ml Grape",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-arumore-aha-bha-pha-body-wash-500ml-grape-1.webp?alt=media&token=6472e4aa-3c0d-42aa-ac5d-5822adf5a1bb",
    price: 195000,
    cost: 136500,
    percentDiscount: 90,
    originalPrice: 370500,
    numberAvailable: 230000,
    description:
      '<h2>Mô tả sản phẩm</h2><p>Sữa tắm Arumore AHA BHA PHA Body Wash 500ml là sản phẩm sữa tắm cao cấp đến từ thương hiệu Arumtown Hàn Quốc, chuyên dành cho da mụn. Sản phẩm với công thức chứa 3 loại axit tẩy tế bào chết: AHA, BHA và PHA giúp làm sạch sâu lỗ chân lông, loại bỏ tế bào da chết, kiểm soát dầu thừa và hỗ trợ giảm mụn hiệu quả.</p><p>Tại Cocolux đang bán 2 dòng sữa tắm Arumore AHA BHA PHA Body Wash 500ml:</p><ul><li><strong>Sữa Tắm Arumore AHA BHA PHA Body Wash 500ml Grape</strong></li></ul><p><img src="https://cocolux.com/storage/upload_image/images/mo-ta-sua-tam-arumore-aha-bha-pha-body-wash-500ml-grape.jpg"></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-arumore-aha-bha-pha-body-wash-500ml-grape-2.jpg?alt=media&token=2bc38ec6-b463-4f37-8210-9af4ef1d1e1d",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-arumore-aha-bha-pha-body-wash-500ml-grape-4.jpg?alt=media&token=9fc450c1-890e-4c07-bbbe-b93179be1ee7",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Sữa tắm",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Sữa Tắm Happy Bath Berry Punch 900g - Berry",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-happy-bath-berry-punch-900g-2(1).jpg?alt=media&token=ec19a6ad-38ab-44a8-ad92-cba8ba42d469",
    price: 119000,
    cost: 83300,
    percentDiscount: 74,
    originalPrice: 207060,
    numberAvailable: 300,
    description:
      "<p>Sữa tắm Happy Bath là dòng sản phẩm sữa tắm cao cấp, được yêu thích bởi các thành phần tự nhiên như hoa tươi, tảo biển, và khoáng chất. Những thành phần này không chỉ cung cấp độ ẩm cần thiết mà còn nuôi dưỡng làn da một cách nhẹ nhàng, giúp tăng cường độ đàn hồi và làm sáng da.&nbsp;</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-tam-happy-bath-berry-punch-900g-1(1).jpg?alt=media&token=811d7aed-6bc2-4700-8750-a8feb74352de",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Sữa tắm",
    producerId: "Hada Labo",
  },
  {
    nameProduct: "Gel Tắm Và Rửa Mặt Nuxe Rêve De Miel 400ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fgel-tam-va-rua-mat-nuxe-reve-de-miel-400ml.webp?alt=media&token=69de9309-7df3-4353-9c1d-bd5798838ea3",
    price: 625000,
    cost: 437500,
    percentDiscount: 57,
    originalPrice: 981249,
    numberAvailable: 500,
    description:
      "<p>Gel Tắm Và Rửa Mặt Nuxe Rêve De Miel 400ml là sản phẩm chăm sóc da đa năng đến từ thương hiệu Nuxe. Sản phẩm có chứa thành phần chính là chiết xuất mật ong cô đặc, được biết đến với khả năng nuôi dưỡng và bảo vệ da một cách tự nhiên.&nbsp;</p><p>Với công thức dịu nhẹ và giàu độ ẩm, sản phẩm này không chỉ làm sạch da một cách nhẹ nhàng mà còn cung cấp độ ẩm cần thiết để giữ cho làn da mềm mại và mịn màng.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fgel-tam-va-rua-mat-nuxe-reve-de-miel-400ml%20(2).jpg?alt=media&token=adb23cd0-60de-4b5a-a329-f07eee127b42",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fgel-tam-va-rua-mat-nuxe-reve-de-miel-400ml%20(4).jpg?alt=media&token=f22ffa45-a8b1-4e50-8a13-b88bf7fc9df7",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Sữa tắm",
    producerId: "Hada Labo",
  },
  {
    nameProduct: "Xà Phòng Tesori d'Oriente White Musk Hương Nước Hoa 125g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1686879168595-xa-phong-nuoc-hoa-tesori-d-oriente-white-musk.webp?alt=media&token=9e5f476d-41b5-4b45-acf6-22bae39e3618",
    price: 75000,
    cost: 52500,
    percentDiscount: 14,
    originalPrice: 85500,
    numberAvailable: 400,
    description:
      "<p>Tesori d'Oriente là thương hiệu mỹ phẩm chăm sóc da nổi tiếng đến từ Ý. Lấy cảm hứng từ trí tuệ tâm linh và truyền thống cổ xưa của văn hóa phương Đông, Tesori d'Oriente đã tạo ra bộ sưu tập độc quyền các sản phẩm chăm sóc cơ thể độc đáo nhưng không kém phần chất lượng. Một trong số đó, không thể bỏ qua Xà Phòng Tesori d'Oriente White Musk Hương Nước Hoa 125g.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1686879178085-xa-phong-nuoc-hoa-tesori-d-oriente-white-musk-4.jpeg?alt=media&token=cfeae435-a78c-4816-b74e-77a9ed6c419b",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1686879185216-xa-phong-nuoc-hoa-tesori-d-oriente-white-musk-3.jpeg?alt=media&token=02be166a-0f3c-42e2-8b5e-6452f325eb9e",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Xà phòng",
    producerId: "Holika Holika",
  },
  {
    nameProduct: "Xà Phòng Pelican Giảm Thâm Nách 100g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1608696812320-xa-phong-tri-tham-nach-pelican-nhat-2.webp?alt=media&token=e4c4579f-2e43-4f45-baff-78e8aab3a840",
    price: 170000,
    cost: 118999,
    percentDiscount: 51,
    originalPrice: 256700,
    numberAvailable: 200,
    description:
      "<p>Pelican là thương hiệu mỹ phẩm chăm sóc cơ thể được yêu thích tại Nhật Bản. Các sản phẩm của hãng nổi bật với các thành phần chiết xuất từ thiên nhiên, có hiệu quả dưỡng da nhanh chóng. Nếu bạn đang tìm kiếm một sản phẩm chăm sóc vùng da dưới cánh tay thì Xà Phòng Pelican Giảm Thâm Nách 100g chính là sự lựa chọn hoàn hảo.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1617852645881-xa-phong-tri-tham-nach.jpeg?alt=media&token=bcfa3897-3da6-49c6-be6b-06bf16a3d13b",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1617852648017-xa-phong-tri-tham-nach-2.jpeg?alt=media&token=b00a5b47-18b9-4d45-9fa3-289c4654b522",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Xà phòng",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Xà Phòng Pelican For Back Giảm Mụn Lưng 135g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1608345822646-tam-tri-mun-lung-for-back-nhat.webp?alt=media&token=403e47ff-3a4c-430f-aff5-c6d3ca76effc",
    price: 135000,
    cost: 94500,
    percentDiscount: 33,
    originalPrice: 179550,
    numberAvailable: 200,
    description:
      "<p>Lưng được xem là bộ phận ẩn chứa nhiều bụi bẩn và tạp chất trên da. Điều này sẽ dẫn đến hiện tượng bít tắc lỗ chân lông và trở thành môi trường tốt nhất để vi khuẩn sinh sôi và phát triển. Xà Phòng Pelican For Back Giảm Mụn Lưng 135g chính là giải pháp để giải quyết tình trạng này.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1617852521525-tam-tri-mun-lung-for-back.jpeg?alt=media&token=6da55c9b-ffad-49b1-ac23-2914a7a65c11",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Xà phòng",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Nước Tẩy Trang Simple Water Boost Cấp Ẩm",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-tay-trang-simple-water-boost-cap-am-400ml.webp?alt=media&token=4d7ee06d-a8bd-405d-8f91-5a3b87f27912",
    price: 198000,
    cost: 138600,
    percentDiscount: 26,
    originalPrice: 249480,
    numberAvailable: 200,
    description:
      '<p>Nước Tẩy Trang Simple Water Boost Cấp Ẩm 400ml là sự lựa chọn tuyệt vời cho làn da khô và nhạy cảm. Với công thức Micellar Water chứa các hạt micelles siêu nhỏ, sản phẩm không chỉ làm sạch sâu lớp trang điểm và bụi bẩn mà còn làm dịu và cung cấp độ ẩm tức thì cho da, giúp da luôn tươi mát, mềm mại mà không gây kích ứng.</p><p><img src="https://cocolux.com/storage/upload_image/images/nuoc-tay-trang-simple-water-boost-cap-am-400ml.jpg"></p><p>Được chiết xuất từ nước tinh khiết gấp ba lần, PENTAVITIN™ có nguồn gốc từ thực vật và prebiotic thực vật, sản phẩm chứa các hạt micelles giúp nhẹ nhàng loại bỏ tạp chất mà không làm khô hay căng da giúp duy trì độ ẩm cho da suốt 4 giờ sau khi sử dụng, đồng thời ngăn ngừa tình trạng da khô căng.&nbsp;Nước Tẩy Trang Simple Water Boost Cấp Ẩm 400ml hoàn toàn không chứa màu nhân tạo, hương liệu, hóa chất gây hại, cồn hay dầu khoáng, đặc biệt an toàn cho da khô và nhạy cảm.</p><p>&nbsp;</p>',
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Tẩy trang",
    producerId: "Holika Holika",
  },
  {
    nameProduct: "Dầu Tẩy Trang Bioderma Sensibio Micellar Cleansing Oil 150ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fdau-tay-trang-bioderma-sensibio-micellar-cleansing-oil-150ml-1.webp?alt=media&token=88abba67-a5c4-4e3b-864a-d1029a43c31c",
    price: 565000,
    cost: 395500,
    percentDiscount: 64,
    originalPrice: 926600,
    numberAvailable: 200,
    description:
      "<p>Dầu tẩy trang Bioderma Sensibio Micellar Cleansing Oil 150ml là một sản phẩm làm sạch da nhẹ nhàng, ứng dụng công nghệ Micellar tác động kép kết hợp với dầu hạt cải, giúp loại bỏ lớp trang điểm chống nước, kem chống nắng và bã nhờn mà không gây kích ứng da. Sản phẩm này không chỉ làm sạch mà còn nuôi dưỡng làn da với Amino Acid và Omega 3-6, giúp bảo vệ và duy trì pH tự nhiên của da, đặc biệt phù hợp với làn da nhạy cảm.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fdau-tay-trang-bioderma-sensibio-micellar-cleansing-oil-150ml-4.jpg?alt=media&token=78f35eb0-3ff9-4128-b2e8-5c5adb15c8b1",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fdau-tay-trang-bioderma-sensibio-micellar-cleansing-oil-150ml-6.jpg?alt=media&token=097045eb-13f7-49c5-99ec-f208a3413c54",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Tẩy trang",
    producerId: "Romand",
  },
  {
    nameProduct: "Nước Tẩy Trang JMsolution Derma Care Ceramide 500ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-tay-trang-jmsolution-derma-care-ceramide-cleansing-water-clear-500ml.webp?alt=media&token=d373b971-14f7-4653-be0f-a9318c08eca6",
    price: 165000,
    cost: 115499,
    percentDiscount: 17,
    originalPrice: 193050,
    numberAvailable: 200,
    description:
      "<p>Nước tẩy trang JMsolution Derma Care 500ml là một sản phẩm chăm sóc da chất lượng cao từ thương hiệu JMsolution, được sản xuất tại Hàn Quốc. Sản phẩm này được thiết kế để loại bỏ hoàn toàn lớp trang điểm, bụi bẩn, và bã nhờn từ da, giúp làn da sạch và tươi mới mỗi ngày. Nước tẩy trang JMsolution không chỉ làm sạch hiệu quả mà còn chứa các thành phần dưỡng ẩm lành tính, giúp duy trì độ ẩm và sự cân bằng tự nhiên cho da.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-tay-trang-jmsolution-derma-care-ceramide-cleansing-water-clear-500ml-2.jpg?alt=media&token=2784be5f-0114-425d-a382-8bb39bd1f96c",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-tay-trang-jmsolution-derma-care-ceramide-cleansing-water-clear-500ml-3.jpg?alt=media&token=d52cc1c4-d050-433b-b377-3c3959c9d41b",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-tay-trang-simple-water-boost-cap-am-400ml.webp?alt=media&token=8c43a2e3-9c68-414a-853c-0c816f2fdc50",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Tẩy trang",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct:
      "Sữa Rửa Mặt Neutrogena Blackhead Eliminating Scrub Ngăn Ngừa Mụn Đầu Đen 100g (Mã Mới)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-rua-mat-neutrogena-blackhead-eliminating-scrub-ngan-ngua-mun-dau-den-100g-ma-moi.webp?alt=media&token=545017d0-69ae-4208-98e1-dcca2922ec4e",
    price: 150000,
    cost: 105000,
    percentDiscount: 6,
    originalPrice: 159000,
    numberAvailable: 230,
    description:
      "<p>Sữa Rửa Mặt Neutrogena Blackhead Eliminating Scrub là giải pháp hoàn hảo dành cho làn da dầu, hỗn hợp và dễ bị mụn. Với công thức độc đáo và công nghệ tiên tiến, sản phẩm không chỉ giúp làm sạch da mà còn ngăn ngừa mụn đầu đen hiệu quả.</p><p>Đặc biệt, Sữa Rửa Mặt Neutrogena Blackhead Eliminating Scrub còn chứa các hạt scrub siêu nhỏ giúp tẩy tế bào chết và loại bỏ các tạp chất từ sâu bên trong lỗ chân lông. Điều này không chỉ ngăn ngừa sự hình thành của mụn đầu đen mà còn loại bỏ những mụn đầu đen hiện có, mang lại làn da mịn màng và sáng khỏe.</p><p><br></p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-rua-mat-neutrogena-blackhead-eliminating-scrub-ngan-ngua-mun-dau-den-100g-ma-moi%20(3).jpg?alt=media&token=42c5ef19-d5a8-45df-b8a8-0e2b7a956ca1",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-rua-mat-neutrogena-blackhead-eliminating-scrub-ngan-ngua-mun-dau-den-100g-ma-moi%20(4).jpg?alt=media&token=68215c7a-4d2f-4e2f-9091-5ec273d250ab",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Sửa rửa mặt",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct:
      "Gel Rửa Mặt Cocoon Winter Melon Cleanser Chiết Xuất Bí Đao 310ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F8936217700179.webp?alt=media&token=e68eff85-ef65-4e8d-bcdf-cf74bd6ed0b0",
    price: 236000,
    cost: 165200,
    percentDiscount: 65,
    originalPrice: 389400,
    numberAvailable: 120,
    description:
      "<p>Gel Rửa Mặt Cocoon Winter Melon Cleanser Chiết Xuất Bí Đao 310ml là sản phẩm làm sạch đến từ thương hiệu mỹ phẩm thuần chay Cocoon.&nbsp;</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fgel-rua-mat-cocoon-winter-melon-cleanser-chiet-xuat-bi-dao-310ml%20(2).jpg?alt=media&token=792a2fa6-7193-4106-85f6-ea3465125a06",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fgel-rua-mat-cocoon-winter-melon-cleanser-chiet-xuat-bi-dao-310ml%20(4).jpg?alt=media&token=0728e2d0-6d90-4cb7-ba75-f3220728e5ab",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Sửa rửa mặt",
    producerId: "La Roche-Posay",
  },
  {
    nameProduct: "Kem Dưỡng Mommy Care Perilla Whitening Cream Plus 50g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fkem-duong-mommy-care-perilla-whitening-cream-plus-50g-4.jpg?alt=media&token=d693aa7b-997a-44d2-906a-7d1aedb97fbd",
    price: 350000,
    cost: 244999,
    percentDiscount: 2,
    originalPrice: 357000,
    numberAvailable: 230,
    description:
      "<p>Kem Dưỡng Mommy Care Perilla Whitening Cream Plus 50g là sản phẩm đến từ thương hiệu Mommy Care. Sản phẩm nổi bật với thành phần chiết xuất lá tía tô, có chứa Luteolin, đóng vai trò quan trọng trong việc dưỡng trắng và làm đều màu da, đồng thời, có khả năng chống oxy hóa, ngăn ngừa gốc tự do ảnh hưởng tiêu cực đến làn da.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fkem-duong-mommy-care-perilla-whitening-cream-plus-50g-4.jpg?alt=media&token=0db74a7e-1c81-4c8f-958a-028ef4f9d0de",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa hồng Toner",
    producerId: "REN Clean Skincare",
  },
  {
    nameProduct: "Nước Hoa Hồng Mincer Pharma Daily Care No 04 250ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-hong-mincer-pharma-daily-care-no-04-250ml.webp?alt=media&token=dd28ba06-baed-4d2b-815a-1efac0cbc9d6",
    price: 70000,
    cost: 49000,
    percentDiscount: 85,
    originalPrice: 129500,
    numberAvailable: 450,
    description:
      '<p>Nước Hoa Hồng Mincer Pharma Daily Care No 04 250ml là sản phẩm đến từ thương hiệu Mincer Pharma.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/nuoc-hoa-hong-mincer-pharma-daily-care-no-04-250ml-3.jpg"></p><p>Sản phẩm nổi bật với công thức chứa bộ đôi Glycerin và Hyaluronic Acid (HA) giúp dưỡng ẩm, cấp ẩm và giữ ẩm cho da, duy trì làn da mướt mịn, đủ ẩm. Thêm vào đó, nước hoa hồng còn chứa chiết xuất thiên nhiên từ hoa mộc lan và cỏ đuôi ngựa giúp chống oxy hóa, giảm viêm cho da mụn.&nbsp;</p><p>Mincer Pharma Daily Care Moisturizing Face Toner có kết cấu dạng nước lỏng, trong suốt, dễ dàng thẩm thấu vào da, không gây nhờn dính. Sản phẩm giúp duy trì độ pH cân bằng, làm sạch da, dưỡng ẩm, làm dịu, giảm viêm và hỗ trợ hiệu quả cho những bước dưỡng da tiếp theo.&nbsp;</p><p><br></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-hong-mincer-pharma-daily-care-no-04-250ml-2.jpg?alt=media&token=feb7d5ff-7a35-40e5-b4d3-d955bbf0150b",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-hong-mincer-pharma-daily-care-no-04-250ml-3.jpg?alt=media&token=95048c7f-05b8-4bbf-81bb-0dfbadade94d",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa hồng Toner",
    producerId: "MAC Cosmetics",
  },
  {
    nameProduct:
      "Kem Dưỡng Ẩm Olay Luminous Niacinamide AHA Sáng Da, Mờ Thâm Mụn 50g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fkem-duong-am-olay-luminous-niacinamide-aha-sang-da-mo-tham-mun-50g%20(3).jpg?alt=media&token=52a0424c-ef5a-4afa-abc3-c0782d68c429",
    price: 392000,
    cost: 274400,
    percentDiscount: 46,
    originalPrice: 572320,
    numberAvailable: 450,
    description:
      "<p>Kem Dưỡng Olay Luminous Light Perfecting Ban Ngày Dưỡng Sáng Da Mờ Thâm 50g là giải pháp hoàn hảo cho làn da cần cải thiện sắc tố và giúp da trở nên sáng đều màu.&nbsp;</p><p>Với sự kết hợp độc đáo giữa Niacinamide (Vitamin B3) và AHA (Lactic Acid), sản phẩm giúp làm sáng da, mờ thâm mụn, và cải thiện kết cấu da một cách hiệu quả.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fkem-duong-am-olay-luminous-niacinamide-aha-sang-da-mo-tham-mun-50g%20(3).jpg?alt=media&token=5402c6b5-fb9e-4d3e-af30-b45264b6a79e",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fkem-duong-am-olay-luminous-niacinamide-aha-sang-da-mo-tham-mun-50g%20(4).jpg?alt=media&token=8e5fdd37-a3ba-46cf-b6fa-44de6c4a193c",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Kem dưỡng",
    producerId: "Hada Labo",
  },
  {
    nameProduct:
      "Nước Hoa Hồng Milk Touch Dạng Miếng Toner Pad Milk Touch Five Flower Dark Spot Clearing Jumbo Pad",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-hong-milk-touch-dang-mieng-toner-pad-milk-touch-five-flower-dark-spot-clearing-jumbo-pad%20(4).jpg?alt=media&token=bf401589-9b4f-4677-802e-e747f5a8f4b2",
    price: 450000,
    cost: 315000,
    percentDiscount: 12,
    originalPrice: 504000,
    numberAvailable: 132,
    description:
      "<p>Nước Hoa Hồng Milk Touch Dạng Miếng Toner Pad Milk Touch Five Flower Dark Spot Clearing Jumbo Pad là sản phẩm chăm sóc da đến từ thương hiệu Milk Touch, nổi bật với khả năng tẩy tế bào chết và cấp ẩm chỉ trong 10 giây. Mỗi hộp chứa 60 miếng pad được ngâm trong dung dịch 130ml, mang lại sự tiện lợi và hiệu quả tối ưu cho người sử dụng.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fnuoc-hoa-hong-milk-touch-dang-mieng-toner-pad-milk-touch-five-flower-dark-spot-clearing-jumbo-pad%20(3)%20(1).jpg?alt=media&token=a7b07acb-1cb6-432a-a132-8bef8a5093ba",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Nước hoa hồng Toner",
    producerId: "Sao Thái Dương",
  },
  {
    nameProduct:
      "Serum Olay Luminous Niacinamide AHA Dưỡng Sáng Da Mờ Thâm Mụn 30ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fserum-olay-luminius-niacinamide-aha-duong-sang-da-mo-tham-mun-30ml.jpg?alt=media&token=0a30e58b-3729-49f5-859c-62d60b113701",
    price: 391000,
    cost: 273700,
    percentDiscount: 19,
    originalPrice: 465290,
    numberAvailable: 341,
    description:
      "<p>Serum Olay Luminous Niacinamide AHA Dưỡng Sáng Da Mờ Thâm Mụn 30ml đến từ thương hiệu nổi tiếng Olay - chuyên đem đến những giải pháp làm sáng da nhanh chóng, hiệu quả.</p>",
    properties: {},
    gallery: [],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Serum/ Tinh chất",
    producerId: "Holika Holika",
  },
  {
    nameProduct: "Tinh Chất Eucerin Dưỡng Cho Da Mụn Pro Acne SOS Serum 40ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Ftinh-chat-eucerin-duong-cho-da-mun-pro-acne-sos-serum-40ml%20(2).jpg?alt=media&token=ca4d590f-bf9e-4791-a62f-e9b0da242788",
    price: 591000,
    cost: 413700,
    percentDiscount: 66,
    originalPrice: 981060,
    numberAvailable: 342,
    description:
      "<p>Tinh Chất Eucerin Dưỡng Cho Da Mụn Pro Acne SOS Serum 40ml là sản phẩm của thương hiệu dược mỹ phẩm Eucerin đến từ Đức, nổi tiếng với các giải pháp chăm sóc da hiệu quả và an toàn. Với phức hợp 3X Axit (AHA/BHA/PHA), Carnitine, Decanediol và Licochalcone A, serum giúp giảm mụn nhanh chóng mà không gây tác dụng phụ như đỏ, rát hay bong tróc da. Đồng thời, sản phẩm còn giúp kiểm soát dầu nhờn hiệu quả, giữ cho làn da luôn sạch sẽ và khô thoáng suốt 8 giờ.</p>",
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Serum/ Tinh chất",
    producerId: "Holika Holika",
  },
  {
    nameProduct: "Mặt Nạ JM Solution Mask - Màu Sắc: Ngọc Trai Đen (Mã Mới)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1683622952053-mat-na-jmsolution-donation-facial.jpeg?alt=media&token=ec846a6c-589b-4977-aa0e-3bcdb678f16d",
    price: 22000,
    cost: 15399,
    percentDiscount: 56,
    originalPrice: 34320,
    numberAvailable: 8932,
    description:
      '<p>Đắp mặt nạ là phương pháp dưỡng da phổ biến và được nhiều người lựa chọn bởi khả năng dưỡng da nhanh chóng và hiệu quả. Dòng <a href="https://cocolux.com/danh-muc/mat-na-giay-i.117" rel="noopener noreferrer" target="_blank">mặt nạ giấy</a> đến từ JMSolution có khả năng dưỡng ẩm, chống lão hóa, đào thải độc tố da, cho da trẻ đẹp, săn chắc.</p>',
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Mặt nạ giấy",
    producerId: "REN Clean Skincare",
  },
  {
    nameProduct: "Son Thỏi Bbia Ready To Wear Water Lipstick - 04 Wet Apricot",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1691029386839-son-thoi-bbia-ready-to-wear-water-lipstick-04-wet-apricot-2.jpeg?alt=media&token=0bed6089-c04b-4628-bda1-7041e1bda6d8",
    price: 215000,
    cost: 150500,
    percentDiscount: 27,
    originalPrice: 273050,
    numberAvailable: 123,
    description:
      "<p>Son Thỏi Bbia Ready To Wear Water Lipstick là một sản phẩm son môi nước của thương hiệu mỹ phẩm Hàn Quốc BBIA.&nbsp;</p><p>Đây là loại son môi được thiết kế với công thức đặc biệt giúp giữ ẩm cho đôi môi, mang lại cảm giác mềm mại, không khô và không gây nhờn dính. Sản phẩm có độ bám màu tốt, giúp giữ màu lâu và tươi sáng trên môi. Ngoài ra, với thiết kế son dạng thỏi tiện lợi, dễ dàng sử dụng và mang theo bên mình.</p><p>BBIA Ready To Wear Water Lipstick có nhiều tông màu đa dạng từ những sắc đỏ đậm, cam tươi sáng đến những tông hồng nhẹ nhàng, phù hợp với nhiều phong cách trang điểm và hoàn cảnh khác nhau.</p><p><br></p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1691029816474-son-thoi-bbia-ready-to-wear-water-lipstick-04-wet-apricot-4.png?alt=media&token=7e336353-0853-4110-8271-f3dc9c6840a6",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son thỏi",
    producerId: "Dior",
  },
  {
    nameProduct:
      "Mặt Nạ Sur.medic+ Super Hyaluronic 100 Aqua Mask 30g 1PCS - Dưỡng Ẩm",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fmat-na-surmedic-super-hyaluronic-acid-100-aqua-mask-30g-duong-am-1.jpg?alt=media&token=c27c8ccb-73ec-4c81-b949-259825a2d004",
    price: 290000,
    cost: 203000,
    percentDiscount: 39,
    originalPrice: 403100,
    numberAvailable: 0,
    description:
      '<p>Mặt Nạ Sur.medic+ Super Hyaluronic 100 Aqua Mask 30g 1PCS - Dưỡng Ẩm là sản phẩm thuộc thương hiệu mỹ phẩm chăm sóc da nổi tiếng Sur.medic+.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/mat-na-surmedic-super-hyaluronic-acid-100-aqua-mask-30g-duong-am.jpg"></p><p>Đây là mặt nạ ampoule có khả năng dưỡng ẩm chuyên sâu theo 3 bước. Sản phẩm sử dụng Hyaluronic Acid Pure 100 làm lớp nền để tăng cường khả năng giữ ẩm cho da.&nbsp;</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/mat-na-surmedic-super-hyaluronic-acid-100-aqua-mask-30g-duong-am-5.jpg"></p><p>Thêm vào đó, nó tận dụng sự chuyển động và hoạt động của HA, đồng thời, tối đa hoá hiệu quả của Hyaluronic Acid để duy trì độ ẩm cho da. Sản phẩm còn chứa thành phần Adenosine giúp cải thiện nếp nhăn.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/mat-na-surmedic-super-hyaluronic-acid-100-aqua-mask-30g-duong-am-4.jpg"></p><p>Mặt Nạ Sur.medic+ Super Hyaluronic 100 có thiết kế thông minh. Sản phẩm được làm từ chất liệu cao cấp, sử dụng công nghệ Microfiber. Theo đó, mặt nạ có cấu trúc sợi Microfiber dày đặc, có khả năng bám chặt chẽ vào các đường cong nhỏ nhất của da. Cấu trúc nâng bao bọc quanh cằm, giúp che phủ dày đặc vùng ống động mạch dễ bị tắc, giúp tạo độ săn chắc cho da.</p><p><br></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fmat-na-surmedic-super-hyaluronic-acid-100-aqua-mask-30g-duong-am.jpg?alt=media&token=d343ddcf-8283-417e-a195-74bb1b4a533c",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fmat-na-surmedic-super-hyaluronic-acid-100-aqua-mask-30g-duong-am-1.jpg?alt=media&token=a04885dd-fcca-4946-829f-bebd4eabcb6d",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Mặt nạ giấy",
    producerId: "MAC Cosmetics",
  },
  {
    nameProduct:
      "Mặt Nạ Calliderm Masque Purifiant Đất Sét Và Hương Thảo 150ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fmat-na-calliderm-masque-purifiant-dat-set-va-huong-thao-150ml-2.jpg?alt=media&token=f60d9ea1-e8ce-425c-97e3-182c2fb9926c",
    price: 179000,
    cost: 125299,
    percentDiscount: 11,
    originalPrice: 198690,
    numberAvailable: 230,
    description:
      "<p>Mặt Nạ Calliderm Masque Purifiant 150ml được thiết kế để mang lại làn da sạch mịn, tươi sáng và khỏe mạnh. Công thức chứa các thành phần tự nhiên và hoạt tính mạnh mẽ, sản phẩm giúp thải độc, làm sạch sâu và dưỡng ẩm da hiệu quả. Hiện mặt nạ Calliderm Masque Purifiant 150ml đang được phân phối tại Cocolux với ba phân loại:</p><p><strong>Mặt Nạ Calliderm Masque Purifiant 150ml</strong> là lựa chọn lý tưởng cho những ai muốn thải độc và thanh lọc da từ sâu bên trong. Công thức đặc biệt với chiết xuất từ 100% than hoạt tính giúp hút bã nhờn, bụi bẩn và tạp chất, mang lại làn da trắng sáng, mịn màng và khỏe mạnh. Sản phẩm phù hợp với mọi loại da và mang lại hiệu quả làm sáng da rõ rệt.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fsua-rua-mat-cerave-thay-doi-bao-bi.jpg?alt=media&token=56578964-3a5a-4cac-ab66-bfa58e878491",
    ],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Mặt nạ rửa",
    producerId: "Romand",
  },
  {
    nameProduct:
      "Mặt Nạ JM Solution Mask - Avocado Oil Ampoule Mask Black 35ml",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1683622934402-mat-na-jm-duong-am-chiet-xuat-bo.jpeg?alt=media&token=50f83827-7242-4861-aa34-e02cb0449efc",
    price: 900003,
    cost: 630002,
    percentDiscount: 29,
    originalPrice: 1161003,
    numberAvailable: 32,
    description:
      '<p>Đắp mặt nạ là phương pháp dưỡng da phổ biến và được nhiều người lựa chọn bởi khả năng dưỡng da nhanh chóng và hiệu quả. Dòng <a href="https://cocolux.com/danh-muc/mat-na-giay-i.117" rel="noopener noreferrer" target="_blank">mặt nạ giấy</a> đến từ JMSolution có khả năng dưỡng ẩm, chống lão hóa, đào thải độc tố da, cho da trẻ đẹp, săn chắc.</p>',
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Mặt nạ giấy",
    producerId: "Sao Thái Dương",
  },
  {
    nameProduct: "Mặt Nạ Ngủ Banobagi Stem Cell Magic Mask 23ml - Acne",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fmat-na-ngu-banobagi-stem-cell-magic-mask-5.jpg?alt=media&token=59ae167e-949c-4620-b485-38aed56ffec7",
    price: 30000,
    cost: 21000,
    percentDiscount: 73,
    originalPrice: 51900,
    numberAvailable: 342,
    description:
      '<p>Mặt Nạ Ngủ Banobagi Stem Cell Magic Mask 23ml đến từ thương hiệu mỹ phẩm chăm sóc da Banobagi. Sản phẩm có thiết kế dạng gel, mềm mại, nhẹ nhàng, có khả năng thẩm thấu nhanh chóng trên da, giúp cung cấp dưỡng chất sâu để hỗ trợ và tăng cường hàng rào bảo vệ da.&nbsp;</p><p>Banobagi Stem Cell Magic Mask nổi bật với công nghệ Derma-Biome™ giúp khôi phục hệ vi sinh vật về sự cân bằng tự nhiên, mang lại lợi thế cho làn da trong việc giảm thiểu và quản lý tình trạng da. Phức hợp C-VITA Complex chứa đến 18 loại vitamin với hàm lượng 59.000ppm giúp dưỡng sáng và nuôi dưỡng làn da khỏe mạnh hơn. Adenosine giúp thúc đẩy quá trình tái tạo tế bào da, dưỡng da sáng mịn, loại bỏ các tế bào chứa hắc tố melanin, làm dịu da, chống viêm, chống lão hóa.</p><p><img src="https://cocolux.com/storage/upload_image/images/mo-ta-mat-na-ngu-banobagi-23ml.jpg"></p><p>Mặt Nạ Ngủ Banobagi Stem Cell Magic Mask 23ml đang có mặt tại Cocolux với 3 phân loại sau:</p><p><strong>Mặt Nạ Ngủ Banobagi Stem Cell Magic Mask 23ml - Acne</strong></p><p><img src="https://cocolux.com/storage/upload_image/images/Huyen/H1811/mat-na-ngu-banobagi-stem-cell-magic-mask-5.jpg"><img src="https://cocolux.com/storage/upload_image/images/mo-ta-mat-na-ngu-banobagi-stem-cell-magic-mask-23ml-acne.jpg"></p><p>Mặt Nạ Ngủ Banobagi Stem Cell Magic Mask 23ml - Acne có thành phần chính là chiết xuất ngải cứu, chiết xuất diếp cá giúp làm dịu da, kiểm soát dầu nhờn, hỗ trợ điều trị và cải thiện tình trạng mụn, đặc biệt là mụn trứng cá.</p>',
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Mặt nạ ngủ",
    producerId: "3CE",
  },
  {
    nameProduct: "Cọ Phủ Kem Nền Jary - J04",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fco-phu-kem-nen-jary-j04%20(2).jpg?alt=media&token=071f3ed8-5554-49b1-8d04-792fa398a8ea",
    price: 50000,
    cost: 35000,
    percentDiscount: 76,
    originalPrice: 88000,
    numberAvailable: 324,
    description: null,
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fco-phu-kem-nen-jary-j04%20(4).jpg?alt=media&token=179b9528-b6fb-4949-a2d3-4ba20c8de685",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Cọ trang điểm",
    producerId: "Romand",
  },
  {
    nameProduct: "Bộ Cọ 14 Cây Kèm Bóp Da Vacosi BC16",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fcach-dung-bo-co-14-cay-kem-bop-da-vacosi-bc16.jpg?alt=media&token=0660ab79-443d-4e87-86b0-c91e2aa15a2b",
    price: 340000,
    cost: 237999,
    percentDiscount: 51,
    originalPrice: 513400,
    numberAvailable: 300,
    description:
      "<p>Bộ cọ 14 cây kèm bóp da Vacosi BC16 của nhà Vacosi đến từ Hàn Quốc gồm có 14 cây cọ chuyên biệt dành cho cá nhân:</p><ul><li>Powder/Blush: Cọ phủ phấn/má hồng.</li><li><br></li><li>Contour: Cọ tạo khối.</li><li><br></li><li>Foundation: Cọ tán kem nền.</li><li><br></li><li>Concealer: Cọ che khuyết điểm.</li><li><br></li><li>Shading: Cọ tán bọng mắt.</li><li><br></li><li>Blending: Cọ tán phấn mắt.</li><li><br></li><li>Large Domed Shader: Cọ đầu tròn lớn đánh bóng mắt.</li><li><br></li><li>Domed Shader: Cọ tròn tán phấn hốc mắt hoặc đuôi mắt.</li><li><br></li><li>Lip: Cọ môi.</li><li><br></li><li>Concealer: Cọ che khuyết điểm.</li><li><br></li><li>Angled Shader: Cọ mắt đầu xéo.</li><li><br></li><li>Small Angle: Cọ đầu xéo nhỏ đa năng.</li><li><br></li><li>Eye/ Lip liner: Cọ kẻ viền mắt/môi.</li><li><br></li><li>Shadow Sponge: Cọ mút tán bọng mắt.</li></ul><p>&nbsp;</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fmo-ta-bo-co-14-cay-kem-bop-da-vacosi-bc16.jpg?alt=media&token=4a33480c-fe7f-40d6-b71f-0acc27bce2ee",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Cọ trang điểm",
    producerId: "Sao Thái Dương",
  },
  {
    nameProduct: "Kẹp Mi Vacosi Bỏ Túi - BM10",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fkep-mi-vacosi-bo-tui-bm10-2.jpg?alt=media&token=26fddaee-9635-4a1e-9a91-cdd1c6fcebf7",
    price: 66000,
    cost: 46200,
    percentDiscount: 68,
    originalPrice: 110880,
    numberAvailable: 1234,
    description:
      "<p>Kẹp mi Vacosi Bỏ Túi - BM10 là một sản phẩm độc đáo và tiện ích trong bộ sưu tập dụng cụ trang điểm MUFE MOFE của Vacosi. Dòng sản phẩm mang lại vẻ ngoài bắt mắt với thiết kế tinh gọn và màu sắc tươi sáng, được chế tác với chất lượng vượt trội để đáp ứng nhu cầu làm đẹp hàng ngày của phái đẹp.</p><p><br></p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fkep-mi-vacosi-bo-tui-bm10-4.jpg?alt=media&token=446b9302-05a8-4c37-a75c-8cf1b48a84c3",
    ],
    isHot: true,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Kẹp mi",
    producerId: "L'Oréal",
  },
  {
    nameProduct: "Lông Mi Giả Jary Full Strip Lashes - F07",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Flong-mi-gia-full-strip-lashes.jpg?alt=media&token=e3c13f58-0ec2-4983-bcf1-510ae52d12d9",
    price: 57000,
    cost: 39900,
    percentDiscount: 67,
    originalPrice: 95190,
    numberAvailable: 123,
    description:
      '<p>Lông Mi Giả Jary Full Strip Lashes là sản phẩm đến từ thương hiệu Jary.</p><p><img src="https://cocolux.com/storage/upload_image/images/san-pham/long-mi-gia-full-strip-lashes.jpg"></p><p>Lông Mi Giả Jary Full Strip Lashes được làm từ chất liệu cao cấp, đem đến cảm giác thoải mái, dễ chịu trong quá trình sử dụng. Sản phẩm được thiết kế thủ công, tạo ra kết cấu mi mỏng nhẹ, được đan xen vào nhau vô cùng tự nhiên, tựa như cấu trúc mi thật, tạo ra hiệu ứng 4D độc đáo, ấn tượng.</p><p>Jary Full Strip Lashes đem đến hàng mi tự nhiên, không bị quá giả. Đặc biệt, sản phẩm có thể tái sử dụng từ 3-5 lần.&nbsp;</p>',
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Mi giả",
    producerId: "Holika Holika",
  },
  {
    nameProduct: "Miếng Dán Kích Mí Jary 120 Miếng - Size L",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fmieng-dan-kich-mi-jary-120-mieng-size-l-1.jpg?alt=media&token=23997a5a-a357-4e02-8a71-8c5aa1690e5e",
    price: 60000,
    cost: 42000,
    percentDiscount: 68,
    originalPrice: 100800,
    numberAvailable: 32000,
    description:
      '<p>Miếng dán kích mí Jary là giải pháp lý tưởng cho những ai mong muốn sở hữu đôi mắt to tròn và mí mắt cân đối mà không cần đến các phương pháp phẫu thuật thẩm mỹ. Được thiết kế với chất liệu cao cấp và công nghệ tiên tiến, miếng dán kích mí Jary mang lại hiệu quả tự nhiên, trong suốt và không để lại dấu vết.</p><p><img src="https://cocolux.com/storage/upload_image/images/mieng-dan-kich-mi-jary-120-mieng-111.jpg"></p><p>Miếng dán kích mí Jary được thiết kế với nhiều kích thước khác nhau để phù hợp với nhiều kiểu dáng mắt, bao gồm 4 size: S, M, L, O. Sản phẩm này có chất liệu mềm mại, có độ dính cao, chống nước và chống mồ hôi, giúp duy trì hiệu ứng mắt hai mí suốt cả ngày dài.</p><p><br></p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fmieng-dan-kich-mi-jary-120-mieng-5.jpg?alt=media&token=016e7d5e-6a49-4496-960a-3f600d599185",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Kích mí",
    producerId: "Hada Labo",
  },
  {
    nameProduct: "Bông Tẩy Trang Hữu Cơ Với Chiết Xuất Trái Goji Và Vitamin C",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fbong-tay-trang-huu-co-cotoneve-2-trong-1-chiet-xuat-lo-hoi-vitamin-b5%20(2).png?alt=media&token=15ba428b-313d-4beb-908e-673f186e055d",
    price: 59000,
    cost: 41300,
    percentDiscount: 26,
    originalPrice: 74340,
    numberAvailable: 0,
    description:
      "<p>Bông Tẩy Trang Hữu Cơ Cotoneve là sản phẩm bông tẩy trang mới đến từ nhà Cotoneve. Được làm từ 100% bông hữu cơ tự nhiên, dòng bông tẩy trang này không chỉ mang lại cảm giác êm ái mà còn tuyệt đối an toàn cho mọi loại da, kể cả da nhạy cảm nhất.&nbsp;</p><p>Đặc biệt, bông hữu cơ của COTONEVE được trồng trong môi trường không sử dụng thuốc trừ sâu hay các chất hóa học độc hại, đảm bảo giữ nguyên độ tinh khiết và an toàn cho người dùng. Với chứng nhận từ GOTS và ICEA, hai tiêu chuẩn uy tín toàn cầu về dệt may hữu cơ, Cotoneve khẳng định chất lượng vượt trội từ nguồn gốc nguyên liệu đến quy trình sản xuất.</p><p>Sản phẩm không chỉ thân thiện với làn da mà còn bảo vệ môi trường nhờ khả năng phân hủy sinh học hoàn toàn. Thiết kế miếng bông không may viền giúp việc sử dụng trở nên nhẹ nhàng và tinh tế hơn, đặc biệt lý tưởng cho vùng mắt và da nhạy cảm.&nbsp;</p><p>Ngoài ra, Bông Tẩy Trang Hữu Cơ Cotoneve còn được bổ sung dưỡng chất, giúp tăng cường hiệu quả làm sạch và dưỡng da, mang lại cảm giác tươi mới và dịu nhẹ sau mỗi lần sử dụng. Sản phẩm đã được kiểm nghiệm da liễu và kiểm soát vi sinh, đảm bảo an toàn tuyệt đối cho sức khỏe của bạn.</p><p>Hiện tại, Cocolux đang phân phối hai dòng của sản phẩm Bông Tẩy Trang Hữu Cơ Cotoneve. Cụ thể:&nbsp;</p><p><strong>Bông Tẩy Trang Hữu Cơ Cotoneve 2 Trong 1 Chiết Xuất Lô Hội &amp; Vitamin B5</strong> là sự lựa chọn hoàn hảo cho làn da nhạy cảm và mỏng manh. Với đặc tính làm mềm da vượt trội, miếng bông được thiết kế thấm hút tốt và có bề mặt bền chắc, lý tưởng không chỉ cho việc chăm sóc da mà còn phù hợp để tẩy sơn móng tay.</p><p><br></p>",
    properties: {},
    gallery: [],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Bông tẩy trang",
    producerId: "REN Clean Skincare",
  },
  {
    nameProduct: "Son Thỏi Aprilkin Ultra Real Matte Lipstick 05 Mai Tai",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-thoi-aprilkin-ultra-real-matte-lipstick-05-mai-tai-2.jpg?alt=media&token=933c7e65-efbe-4269-857a-ca98082564b4",
    price: 250000,
    cost: 175000,
    percentDiscount: 40,
    originalPrice: 350000,
    numberAvailable: 324,
    description:
      "<p>Son thỏi April Skin Ultra Real Matte Lipstick là một trong những dòng son lì được ưa chuộng của thương hiệu April Skin. Với kết cấu siêu nhẹ, ẩm mịn, son mang đến cảm giác thoải mái khi sử dụng và không gây khô môi. Bên cạnh đó, khả năng lên màu chuẩn xác và giữ màu lâu trôi của son cũng là những điểm cộng lớn.</p>",
    properties: {},
    gallery: [],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son thỏi",
    producerId: "3CE",
  },
  {
    nameProduct: "Son Dưỡng Có Màu Vaseline Lip Care Colour 3g - Blooming Pink",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-duong-co-mau-vaseline-lip-care-colour-3g%20(2)(1).jpg?alt=media&token=96c4ee6f-8a90-4046-9698-dbeddb5acf59",
    price: 89000,
    cost: 62299,
    percentDiscount: 66,
    originalPrice: 147740,
    numberAvailable: 0,
    description:
      "<p>Son Dưỡng Có Màu Vaseline Lip Care Colour 3g là sản phẩm son dưỡng đến từ thương hiệu Vaseline thuộc tập đoàn Unilever Mỹ. Với thành phần chính là mật ong Manuka và bơ hạt mỡ siêu dưỡng ẩm suốt 24 giờ, son dưỡng Vaseline có khả năng cung cấp dưỡng chất tối ưu giúp đôi môi luôn căng mọng và mềm mại. Không chỉ vậy, màu sắc nhẹ nhàng của sản phẩm cũng giúp tạo điểm nhấn cho đôi môi của bạn, khiến chúng luôn tươi tắn và rạng rỡ.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-duong-co-mau-vaseline-lip-care-colour-3g%20(3)(1).jpg?alt=media&token=14700538-26d5-4b37-8882-d5961e8a0538",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-duong-co-mau-vaseline-lip-care-colour-3g.jpg?alt=media&token=ea6fbb5c-ed03-403c-a82e-86cb4c67314d",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son dưỡng",
    producerId: "3CE",
  },
  {
    nameProduct:
      "Son Dưỡng Romand Glasting Melting Balm Có Màu Thuần Chay - 14 Dear Apple",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-duong-romand-glasting-melting-balm-co-mau-thuan-chay.jpg?alt=media&token=08bda5ac-9129-41b7-aaed-c1451d3bf009",
    price: 159000,
    cost: 111300,
    percentDiscount: 21,
    originalPrice: 192390,
    numberAvailable: 100,
    description:
      '<p>Son dưỡng có màu được xem là trend mới trong thời gian gần đây. Sản phẩm vừa giúp dưỡng môi, vừa giúp tạo màu cho đôi môi tươi tắn, căng mọng. Nếu bạn là tín đồ của son dưỡng Hàn Quốc thì không thể bỏ qua Son Dưỡng Romand Glasting Melting Balm Có Màu Thuần Chay.</p><p><img src="https://cocolux.com/storage/upload_image/images/Huyen/1801/son-duong-romand-glasting-melting-balm-co-mau-thuan-chay.jpg"></p><p>Son Dưỡng Romand Glasting Melting Balm Có Màu Thuần Chay đến từ thương hiệu mỹ phẩm Hàn Quốc Romand. Đây là son dưỡng thuần chay, có khả năng đem đến đôi môi bóng trong suốt, mịn màng mà không gây cảm giác ngột ngạt.&nbsp;</p>',
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-duong-romand-glasting-melting-balm-co-mau-thuan-chay-1.jpg?alt=media&token=6c4fbfc2-d42f-4e87-b549-bf3415ffce52",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-duong-romand-glasting-melting-balm-co-mau-thuan-chay-14.jpg?alt=media&token=9c7924c3-c31a-4828-a735-aee39f573936",
    ],
    isHot: true,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son dưỡng",
    producerId: "Romand",
  },
  {
    nameProduct: "Son Dưỡng LipIce Sheer Color #Q Milk Tea Hồng Cam Đất 2.4g",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-duong-chuyen-mau-lipice-sheer-color-q-milk-tea-hong-cam-dat%20.jpg?alt=media&token=83e6dac2-9d9a-4918-baac-db9e6b643bad",
    price: 82500,
    cost: 57749,
    percentDiscount: 10,
    originalPrice: 90750,
    numberAvailable: 122,
    description:
      "<p>Son LipIce Sheer Color Q 2.4g nổi bật với sắc hồng và cam tươi tắn, nhẹ nhàng, tự nhiên. Son LipIce Sheer Color Q bao gồm các thành phần có công dụng dưỡng môi tối ưu như Sáp ong thiên nhiên, dầu Olive, Shea Butter, Vitamin A, Vitamin C, Vitamin E. Do đó, son vừa giúp môi trở nên tươi tắn, rạng rỡ, vừa giúp dưỡng ẩm, cung cấp dưỡng chất cho môi khỏe đẹp, căng mọng, mướt mịn.</p>",
    properties: {},
    gallery: [],
    isHot: false,
    isBestSelling: true,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son dưỡng",
    producerId: "L'Oréal",
  },
  {
    nameProduct: "Son Kem Peripera Ink Velvet - 40 Calm Rosy",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1657615113882-son-kem-peripera-ink-velvet.jpeg?alt=media&token=ae6c2478-8854-4cf8-ac22-e87d573db27e",
    price: 185000,
    cost: 129499,
    percentDiscount: 76,
    originalPrice: 325600,
    numberAvailable: 320,
    description:
      "<p>Son Kem Peripera Ink Velvet đến từ thương hiệu mỹ phẩm nổi tiếng của Hàn Quốc Peripera. Sản phẩm có kết cấu dạng velvet mềm mượt, mịn lỳ như nhung. Son chia làm hai lớp: lớp đầu là lớp dưỡng giúp cung cấp độ ẩm cho môi, lớp cuối matte mịn lì, cho đôi môi bạn mềm mại, căng bóng, không hề gây khô môi hay nặng môi. Công thức bám dính tốt với khả năng đàn hồi giúp làm nổi bật những đường nét của đôi môi, cho môi bạn lớp son mềm mại, mượt mà.</p><p>Peripera Ink Velvet có độ che phủ cao, không lộ vân môi, giúp che hết những khuyết điểm trên môi, cho đôi môi đẹp hoàn hảo. Khi apply lên môi, chất son mướt mịn, lướt nhẹ nhàng trên môi, không gây cảm giác nặng môi. Son lên màu chuẩn chỉ sau một lần đánh.</p><p><br></p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2F1657615110570-son-kem-peripera-ink-velvet-26.webp?alt=media&token=a3c5b2e3-27a2-4339-840f-834abf072aa6",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son kem",
    producerId: "Romand",
  },
  {
    nameProduct: "Son Kem Peripera Ink Velvet - 36 Active Coral",
    image:
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-kem-peripera-ink-velvet-36-active-coral-2.jpg?alt=media&token=96986ef3-0e5d-4af7-bce8-6ecdc04877c0",
    price: 185000,
    cost: 129499,
    percentDiscount: 26,
    originalPrice: 233100,
    numberAvailable: 231,
    description:
      "<p>Nếu bạn là tín đồ của mỹ phẩm Hàn Quốc thì không thể bỏ qua dòng Son Kem Peripera Ink Velvet.</p>",
    properties: {},
    gallery: [
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-kem-peripera-ink-velvet-36-active-coral-3.jpg?alt=media&token=ec68032b-e46a-424b-afae-b21d5fdb724d",
      "https://firebasestorage.googleapis.com/v0/b/stoneshop-c41a0.appspot.com/o/images%2Fson-kem-peripera-ink-velvet-36-active-coral-4.jpg?alt=media&token=e8117628-3646-449d-bc60-fe45e15bf81c",
    ],
    isHot: false,
    isBestSelling: false,
    isActive: true,
    createdAt: "2024-09-03T10:32:57.610Z",
    updatedAt: "2024-09-03T10:32:57.610Z",
    categoryId: "Son kem",
    producerId: "Romand",
  },
];

exports.seed = async function (knex, prom) {
  const users = await Models.User.query();
  if (users.length === 0) {
    await Models.Role.query().delete();
    await Models.User.query().delete();
    await Models.Category.query().delete();
    await Models.Producer.query().delete();
    await Models.Product.query().delete();

    const roles = await Models.Role.query().insert(dataRole).returning("*");
    const newUsers = dataUser.map((e) => {
      e.roleId = roles.find((i) => i.nameRole === e.role).id;
      e.password = PasswordUtils.hashSync("123456");
      delete e.role;
      return e;
    });
    await Models.User.query().insert(newUsers);

    // category seed
    const newCategoryMap = categorySeed.map((category) => {
      return { nameCategory: category.nameCategory, image: category.image };
    });

    const categories = await Models.Category.query()
      .insert(newCategoryMap)
      .returning("*");

    await Promise.all(
      categorySeed.map(async (category) => {
        if (category.parent) {
          const parentCategory = categories.find(
            (categr) => categr.nameCategory === category.parent
          );

          if (parentCategory) {
            const categoryInstance = await Models.Category.query().findOne({
              nameCategory: category.nameCategory,
            });

            if (categoryInstance) {
              await categoryInstance
                .$query()
                .patchAndFetch({ parent: parentCategory.id });
            }
          }
        }
      })
    );

    const producerMap = dataProducer.map((producer) => {
      const category = categories.find(
        (category) => category.nameCategory == producer.categoryId
      );
      return {
        ...producer,
        categoryId: category.id,
      };
    });

    const producers = await Models.Producer.query()
      .insert(producerMap)
      .returning("*");

    // Product seed
    const newProducts = dataProduct.map((e) => {
      const category = categories.find((c) => c.nameCategory === e.categoryId);
      const producer = producers.find((p) => p.name === e.producerId);
      if (category && producer) {
        e.categoryId = category.id;
        e.producerId = producer.id;
        return e;
      }
    });
    await Models.Product.query().insert(newProducts);

    // Order seed
    const orderService = new OrderService()
    await Promise.all(orderSeed.map(async(order)=>{
      await orderService.createOne(order)
    }))
  }
  return 1;
};
