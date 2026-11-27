# Project Report: Version Control with Git & GitHub

## 1. Project Overview

- **Project Description**: Static HTML/CSS team introduction website (`TDTT-miniprj`) for the Computational Thinking course, comprising 7 connected HTML pages (`index.html` and 6 individual member pages under `members/`), shared styling (`assets/style.css`), and project documentation (`README.md`, `docs/CHANGELOG.md`, `docs/REPORT.md`).
- **Team Members (6 members)**:
  - **Khánh** (`@DrakyNeUwU`) — `members/khanh.html`, `index.html`, `assets/style.css`, `.gitignore`
  - **Thư Lê** — `members/thu-le.html`
  - **Thư Anh** — `members/thu-anh.html`
  - **Thiện** — `members/thien.html`
  - **Sand** — `members/sand.html`
  - **ZT** (`@Zoto1`) — `members/zt.html`
- **GitHub Repository**: https://github.com/Zoto1/TDTT-miniprj
- **GitHub Pages**: https://zoto1.github.io/TDTT-miniprj/ *(đang chờ ZT kích hoạt ở Task 6)*

## 2. Team Contributions

| Member | Assigned Tasks | Contributions | Evidence |
|---|---|---|---|
| **Khánh (`@DrakyNeUwU`)** | Tasks 1, 2, 3, 7 *(và sẵn sàng phối hợp Task 4 nếu phân công)* | Tạo `.gitignore` và stylesheet dùng chung `assets/style.css`; xây dựng trang chủ `index.html` với thanh điều hướng 7 trang và 6 thẻ thành viên; xây dựng trang cá nhân `members/khanh.html` (giới thiệu, sở thích, kỹ năng, mục tiêu học tập, ví dụ 4 trụ cột Tư duy tính toán); khởi tạo khung báo cáo `docs/REPORT.md` và cập nhật phần đóng góp của Khánh. | Commits: [`e549ff8`](https://github.com/Zoto1/TDTT-miniprj/commit/e549ff85dd2ba71c41f1f135dd7a73f5e32cafea), [`9a56405`](https://github.com/Zoto1/TDTT-miniprj/commit/9a564055cf3d610097a140b153d1818165f42a96), [`3ad16c5`](https://github.com/Zoto1/TDTT-miniprj/commit/3ad16c58cbea6d40b48f4d3d086606167599be83), [`e0295e3`](https://github.com/Zoto1/TDTT-miniprj/commit/e0295e3067551ad3f0fc66d5d5679ed152abf59f); PRs: [#1](https://github.com/Zoto1/TDTT-miniprj/pull/1), [#2](https://github.com/Zoto1/TDTT-miniprj/pull/2) *(và PR báo cáo `docs/report-khanh`)* |
| **Thư Lê** | Tasks 1, 2, 3, 4, 7 | *(Thành viên tự cập nhật sau khi hoàn thành)* | *(Link commit/PR của Thư Lê)* |
| **Thư Anh** | Tasks 1, 2, 3, 4, 7 | *(Thành viên tự cập nhật sau khi hoàn thành)* | *(Link commit/PR của Thư Anh)* |
| **Thiện** | Tasks 1, 2, 3, 5, 7 | *(Thành viên tự cập nhật sau khi hoàn thành)* | *(Link commit/PR của Thiện)* |
| **Sand** | Tasks 1, 2, 3, 5, 7 | *(Thành viên tự cập nhật sau khi hoàn thành)* | *(Link commit/PR của Sand)* |
| **ZT (`@Zoto1`)** | Tasks 1, 2, 3, 6, 7 | Khởi tạo cấu trúc repository ban đầu (`Init Tree folder`); phụ trách `members/zt.html`, `docs/CHANGELOG.md`, `README.md`, tag `v1.0.0` và triển khai GitHub Pages. *(Thành viên cập nhật chi tiết phần sau)* | Commit [`e24dc6d`](https://github.com/Zoto1/TDTT-miniprj/commit/e24dc6d014b5465da8f42a290750287e6795cb8d) *(và các commit/PR tiếp theo)* |

## 3. Implementation and Evidence

### Task 1. Setting Up the Repository and Managing Commits
- **Work completed**:
  - ZT khởi tạo repository và cây thư mục ban đầu trên nhánh `main` (`e24dc6d`).
  - Khánh cấu hình danh tính Git cục bộ (`DrakyNeUwU <vipprovip201@gmail.com>`), tạo `.gitignore` và stylesheet dùng chung `assets/style.css`, xây dựng trang chủ `index.html` và trang cá nhân `members/khanh.html` với các commit tách biệt, rõ nghĩa.
- **Evidence**:
  - Initial commit: [`e24dc6d`](https://github.com/Zoto1/TDTT-miniprj/commit/e24dc6d014b5465da8f42a290750287e6795cb8d)
  - Khánh's commits:
    - [`e549ff8`](https://github.com/Zoto1/TDTT-miniprj/commit/e549ff85dd2ba71c41f1f135dd7a73f5e32cafea) — `Add .gitignore and shared stylesheet for team website`
    - [`9a56405`](https://github.com/Zoto1/TDTT-miniprj/commit/9a564055cf3d610097a140b153d1818165f42a96) — `Add homepage index.html with navigation and 6 member cards`
    - [`3ad16c5`](https://github.com/Zoto1/TDTT-miniprj/commit/3ad16c58cbea6d40b48f4d3d086606167599be83) — `Add Khanh profile page structure, bio, and navigation`
    - [`e0295e3`](https://github.com/Zoto1/TDTT-miniprj/commit/e0295e3067551ad3f0fc66d5d5679ed152abf59f) — `Add computational thinking applied example to Khanh profile page`
  - Git commands used: `git add`, `git commit`, `git push`, `git status`, `git log --oneline --graph --all`.
- **Result**: Đã thiết lập `.gitignore`, CSS dùng chung, trang chủ và trang cá nhân của Khánh với hơn 3 commit có ý nghĩa theo đúng danh tính Git riêng; các thành viên khác tiếp tục bổ sung phần của mình.

### Task 2. Working with Branches
- **Work completed**:
  - Khánh phát triển toàn bộ thay đổi trên các nhánh riêng tách từ `main` (`feature/homepage-nav`, `feature/page-khanh`, `docs/report-khanh`), không commit trực tiếp lên `main`.
- **Evidence**:
  - Branches đã đẩy lên `origin`:
    - `feature/homepage-nav`
    - `feature/page-khanh`
    - `docs/report-khanh`
  - *(Nhóm sẽ bổ sung ảnh chụp `git branch -a` / `git log --graph` trong `docs/images/` sau khi đủ nhánh của cả 6 thành viên).*
- **Result**: Đã có 3 nhánh riêng của Khánh tách bạch theo từng nhóm tệp; đang chờ các thành viên còn lại tạo thêm feature branch để đạt tối thiểu 5 feature branch toàn nhóm.

### Task 3. Collaborating with Pull Requests
- **Work completed**:
  - Khánh mở 3 Pull Request độc lập từ các nhánh tính năng vào `main` (chờ thành viên khác trong nhóm review chéo và merge):
    - PR [#1](https://github.com/Zoto1/TDTT-miniprj/pull/1): `feat: Thêm trang chủ index.html, điều hướng chung và CSS dùng chung` (`feature/homepage-nav` &rarr; `main`)
    - PR [#2](https://github.com/Zoto1/TDTT-miniprj/pull/2): `feat: Tạo trang cá nhân của Khánh (members/khanh.html)` (`feature/page-khanh` &rarr; `main`)
    - PR #3 (`docs/report-khanh` &rarr; `main`): khởi tạo `docs/REPORT.md` và cập nhật đóng góp của Khánh.
- **Evidence**:
  - PR links: [#1](https://github.com/Zoto1/TDTT-miniprj/pull/1), [#2](https://github.com/Zoto1/TDTT-miniprj/pull/2) *(và link PR #3 sau khi mở)*.
  - *(Bổ sung ảnh chụp review comment và trạng thái Merged trong `docs/images/` sau khi các thành viên review chéo).*
- **Result**: Các PR của Khánh đã mở trên GitHub không xung đột lẫn nhau, sẵn sàng để thành viên nhóm review và merge vào `main`.

### Task 4. Resolving a Merge Conflict
- **Work completed**:
  - Khánh đã gắn sẵn ID `#site-title` cho thẻ `<h1>` trong `index.html` để thuận tiện cho bài thực hành xung đột tiêu đề sau khi PR [#1](https://github.com/Zoto1/TDTT-miniprj/pull/1) được merge vào `main`.
  - *(Chờ nhóm thực hiện tạo conflict có chủ đích trên `#site-title` của `index.html`, giải quyết conflict và hoàn tất merge).*
- **Evidence**:
  - *(Chờ ảnh chụp conflict markers, quá trình giải quyết và Git graph lưu trong `docs/images/`).*
- **Result**: *(Đang chờ thực hiện sau khi `index.html` được merge vào `main`).*

### Task 5. Reverting a Commit
- **Work completed**:
  - *(Chờ Thiện tạo commit có liên kết điều hướng sai qua PR và Sand xác định commit lỗi để chạy `git revert <commit-id>`).*
- **Evidence**:
  - *(Chờ link faulty commit, revert commit và ảnh chụp kiểm tra trong `docs/images/`).*
- **Result**: *(Đang chờ thực hiện).*

### Task 6. Preparing a Release and Deploying the Website
- **Work completed**:
  - *(Chờ ZT cập nhật `README.md`, `docs/CHANGELOG.md`, gắn/push tag `v1.0.0` và bật GitHub Pages).*
- **Evidence**:
  - *(Chờ link tag `v1.0.0`, URL GitHub Pages hoạt động và ảnh chụp triển khai trong `docs/images/`).*
- **Result**: *(Đang chờ thực hiện).*

### Task 7. Writing the Project Report
- **Work completed**:
  - Khánh khởi tạo cấu trúc báo cáo chuẩn theo yêu cầu trong `docs/REPORT.md`, cập nhật đầy đủ bảng đóng góp và bằng chứng commit/PR của bản thân, đồng thời để sẵn phần cho 5 thành viên còn lại cập nhật qua các commit/PR tiếp theo.
- **Evidence**:
  - Branch `docs/report-khanh` và commit cập nhật `docs/REPORT.md`.
  - *(Cần thêm tối thiểu 2 commit báo cáo từ các thành viên khác và cập nhật link dẫn tới `docs/REPORT.md` trong `README.md`).*
- **Result**: Khung báo cáo `docs/REPORT.md` đã hoàn thiện phần của Khánh và sẵn sàng cho cả nhóm tiếp tục bổ sung.
