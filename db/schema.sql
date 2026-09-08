-- techcadd Mohali — website enquiry storage
-- ---------------------------------------------------------------------------
-- Open this file in MySQL Workbench and run it once (lightning-bolt icon), or
-- run `npm run db:setup`, which executes the same statements from Node.
--
-- Every form on the site writes one row into `enquiries`:
--   Contact page form ....... /api/enquiry     form_type = 'enquiry'
--   Enquiry modal ........... /api/enquiry     form_type = 'enquiry'
--   Home CTA callback ....... /api/enquiry     form_type = 'enquiry'
--   Career Track tool ....... /api/enquiry     form_type = 'enquiry'
--   Training Matcher tool ... /api/enquiry     form_type = 'enquiry'
--   Course page forms ....... /api/course-enquiry  form_type = 'course-enquiry'
-- `source` names the exact form; every optional column has a default, because
-- the short forms ask for a phone number and nothing else.
-- ---------------------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS techcadd_mohali
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE techcadd_mohali;

CREATE TABLE IF NOT EXISTS enquiries (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  form_type     VARCHAR(32)  NOT NULL DEFAULT 'enquiry'  COMMENT 'enquiry | course-enquiry',
  source        VARCHAR(120) NOT NULL DEFAULT 'Website'  COMMENT 'Which form on which page',
  name          VARCHAR(120) NOT NULL DEFAULT '',
  phone         VARCHAR(24)  NOT NULL DEFAULT '',
  email         VARCHAR(160) NOT NULL DEFAULT '',
  course        VARCHAR(160) NOT NULL DEFAULT '',
  mode          VARCHAR(48)  NOT NULL DEFAULT ''         COMMENT 'Preferred batch: Morning, Evening, Weekend...',
  message       TEXT         NULL,
  branch        VARCHAR(60)  NOT NULL DEFAULT 'Mohali',
  page_url      VARCHAR(255) NOT NULL DEFAULT ''         COMMENT 'Page the form was submitted from',
  referrer      VARCHAR(255) NOT NULL DEFAULT '',
  ip_address    VARCHAR(45)  NOT NULL DEFAULT '',
  user_agent    VARCHAR(255) NOT NULL DEFAULT '',
  status        ENUM('new','contacted','enrolled','closed') NOT NULL DEFAULT 'new',
  notes         TEXT         NULL                        COMMENT 'Counsellor follow-up notes',
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_created_at (created_at),
  KEY idx_status (status),
  KEY idx_phone (phone),
  KEY idx_form_type (form_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Optional: a dedicated application user, so the site does not connect as root.
-- Change the password before running these two lines.
-- ---------------------------------------------------------------------------
-- CREATE USER IF NOT EXISTS 'techcadd'@'localhost' IDENTIFIED BY 'change-me';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON techcadd_mohali.* TO 'techcadd'@'localhost';
-- FLUSH PRIVILEGES;

-- ---------------------------------------------------------------------------
-- Handy queries for the front desk
-- ---------------------------------------------------------------------------
-- Newest first:
--   SELECT id, created_at, source, name, phone, course, status FROM enquiries ORDER BY created_at DESC;
-- Today only:
--   SELECT * FROM enquiries WHERE DATE(created_at) = CURDATE() ORDER BY created_at DESC;
-- Still to be called:
--   SELECT * FROM enquiries WHERE status = 'new' ORDER BY created_at;
-- Mark one as called:
--   UPDATE enquiries SET status = 'contacted', notes = 'Called, wants evening batch' WHERE id = 1;
-- Which form brings the most leads:
--   SELECT source, COUNT(*) AS total FROM enquiries GROUP BY source ORDER BY total DESC;
