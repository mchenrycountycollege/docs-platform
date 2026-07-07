---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html
title: Transports - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Publishing

# Overview[](#Overview)

A Transport represents a server to which content can be published. Transports can be used by one or more Destinations.  Destinations provide an extra layer of abstraction on top of Transports that allow users to publish content to different locations on the same Transport. Basically, a Transport is "how" the content gets there and Destination is "where" it goes.

# Filesystem Transports[](#FilesystemTransports)

Filesystem Transports can push out content to a location on the CMS server’s hard drive or to a mapped network location.  In order to successfully publish using a Transport that points to a mapped network location, the operating system level user executing the Cascade CMS system process must have the appropriate privileges to write to and create new files in the network publish location.

**Note** - Filesystem Transports are applicable to legacy on-premise environments only.

To create a Filesystem Transport:

1.  Navigate to **Manage Site** > **Transports**.
2.  Navigate to the container in which the new Transport will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Transport**.
4.  Select **Filesystem** and click**Choose**.
5.  In the **Name** field, enter the name for your Transport.
6.  In the **Parent Container** field, select a container for the Transport, if desired.
7.  In the **Server Directory** field, enter a directory path. This path will be prepended to an optional non-absolute Destination Directory path when determining the full published path of an asset. This combined path is then prepended to asset paths when publishing. For example, if a Transport has a Server Directory of '/www/publish root', the Destination using the Transport has a Directory of 'mysite' and the asset being published has a system path of '/content/my press release'; then the asset will be published to the '/www/publish root/mysite/content' directory in the filesystem. If, however, the Destination being used contains an absolute path, then the Server Directory field on the Transport will be ignored.
8.  Click **Submit**.

## Filesystem Access Rights and Permissions

Filesystem Transports are restricted by filesystem level access rights and permissions. In order to successfully publish, the user who owns the Cascade CMS process must have write access to the directory specified in the Transport. Otherwise, the publish report will contain access rights violations.

### Mapped Network Locations

It is possible to publish to a mapped network drive using a Filesystem Transport. The directory used as the mount point for a network-mapped drive should be treated like any other directory in the filesystem. Note, however, that because Cascade CMS is treating the drive like a directory; the mechanism by which the drive is being shared (NFS, FTP, etc.) cannot be managed by Cascade CMS. An alternative would be to set up an FTP/FTPS/SFTP server and a corresponding FTP/FTPS/SFTP Transport that can be managed from within Cascade CMS.

# FTP/FTPS/SFTP Transports[](#FTPFTPSSFTPTransports)

FTP/FTPS/SFTP Transports push content to a remote server via the FTP, FTPS (FTP over SSL/TLS), or SFTP (Secure FTP) protocols. The account specified in the Transport's settings must have appropriate privileges on the remote server to navigate through the folder structure, write, and create to ensure that publish operations do not encounter errors.

To create a FTP/FTPS/SFTP Transport:

1.  Navigate to **Manage Site** > **Transports**.
2.  Navigate to the container in which the new Transport will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Transport**.
4.  Select **FTP/FTPS/SFTP** and click **Choose**.
5.  In the **Name** field, enter a name for your Transport.
6.  In the **Parent Container** field, select a container for the Transport, if desired.
7.  Under **Transport Settings**, configure the following fields:
    -   **Server Name** - The hostname of the server to which Cascade will connect.
    -   **Server Port** - The port over which Cascade will communicate with the FTP/FTPS/SFTP server. Note that the default port for each protocol selected below is preselected.
    -   **Server Directory** - An optional directory path that is prepended to a non-absolute Destination Directory path when determining the full published path of an asset. This combined path is then prepended to asset paths when publishing. For example, if a Transport has a Server Directory of '/www/publish root', the Destination using the Transport has a Directory of 'mysite' and the asset being published has a system path of '/content/my press release'; then the asset will be published to the '/www/publish root/mysite/content' directory on the FTP/FTPS/SFTP server. If, however, the Destination being used contains an absolute path, then the Server Directory field on the Transport will be ignored.
8.  Under **Protocol**, select one the following:
    -   **FTP** - With option to **Use Passive FTP (PASV)**.
    -   **FTPS** - FTP over SSL/TLS.
    -   **SFTP** - Secure FTP.
9.  Under **Authentication Settings**, configure the following fields:
    -   **Username** - The username used when authenticating with the FTP/FTPS/SFTP server.
    -   **Authentication Type**
        -   **Password** - The password to be used in combination with Username to authenticate with the FTP/FTPS/SFTP server.
        -   **SSH Key** - Allows you to upload a Private Key file and an optional Private Key Passphrase to authenticate with an SFTP server.
10.  Click **Submit**.

# Database Publishing[](#DatabasePublishing)

Database publishing allows publishable assets (pages, files, and folders) to be published to an external MySQL database. This gives developers of third-party applications a way to access the content in Cascade CMS in a structured, tabular format. Database publishing requires a Database Transport and a Destination that uses the Transport. Content published to this Destination will end up as records in the remote database.

To create a Database Transport:

1.  Navigate to **Manage Site** > **Transports**.
2.  Navigate to the container in which the new Transport will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Transport**.
4.  Select **Database** and click **Choose**.
5.  In the **Name** field, enter the name for your Transport.
6.  In the **Parent Container** field, select a container for the Transport, if desired.
7.  Under **Database Transport Settings**, configure the following fields:  
    -   **Site Id** - An identifier that is attached to each item published using this Transport that is used to differentiate between publishes from different Database Transports.
    -   **Server Name**\- The hostname of the server to which Cascade will connect.
    -   **Server Port** - The port over which Cascade will communicate with MySQL.
    -   **Database Name** - The name of the database into which data will be inserted.
    -   **Username** - The username used when authenticating with MySQL.
    -   **Password** - The password to be used in combination with Username to authenticate with MySQL.
8.  Click **Submit**.

## Requirements for Database Publishing

-   Database publishing requires MySQL 5+.
-   The default character set on the external database and all its tables and text columns must be set to *utf8,* and the collation must be *utf8\_unicode\_ci*.

**Note** - SSL is not currently supported for Database Transports. Because MySQL 8 defaults to SSL for connections, if you are using MySQL 8 on your target database, you may need to add `ssl=0` to the target database's configuration file and restart it to disable SSL entirely.

### Types of Content being Published

-   Files - Published files include the name, location, path, and metadata of the associated asset in the CMS; the published version, however, does not include the byte content of the file.
-   Folders - Published folders include the name, location, path, and metadata of the associated asset in the CMS; they serve as containers for collections of other files, pages, and folders.
-   Pages - Published pages include the name, location, path, and metadata of the associated asset in the CMS; also includes the rendered content of the DEFAULT region (i.e. page specific content with any default region transformations applied). Works with both Structured Data and WYSIWYG Pages.

### External Database

Database publishing creates records in an external database that containing five tables: file, folder, page, metadata, and metadata\_custom.  The file, folder and page tables contain records that are mapped from the corresponding assets managed in Cascade.  The metadata and custom\_metadata tables contain the wired and dynamic metadata for the page, file and folder assets represented in the file, folder, and page tables.  A few notes on some of the above fields:

-   account\_id - should always be 1
-   site\_id - is an arbitrary value that reflects a particular site to which the record belongs, and is set on the transport
-   folder\_id - corresponds to the *cms­­\_id* of a folder, and not its *id* field in the remote database

The default database schema for database publishing can be [downloaded here](http://github.com/hannonhill/Cascade-Server-Default-Database/raw/master/cascade_db_publishing_schema.zip).

### Site IDs

As mentioned above, a site id is an arbitrary number set on a Database Transport to reflect the 'site' to which a record belongs. The site id should be unique for each of the multiple Database Transports using the same external MySQL database to effectively distinguish the content.

### Troubleshooting Database Transports

If Cascade is unable to publish to an external database, make sure these guidelines are being followed:

-   The server name and port are correct (usually 3306 for MySQL).
-   A firewall is not blocking access on the above port.
-   The host that is trying to connect has granted access to the database transport user.
-   The bind-address parameter in the MySQL configuration is not set to localhost or the loopback address.

Useful information in solving these problems can be garnered from the output of a Transport or Destination connectivity test.

### Other Notes

Until now, publishing has consisted of moving files to a local or remote file system. Database publishing is more along the lines of synchronizing some portion of the asset hierarchy within Cascade to representative records in an external database. When using database publishing, keep in mind a few of these important items :

-   Records inserted during a database publish do *not* represent the assets in the state in which they would have been published to a file system by simply publishing them. This is particularly true if options are set on relevant targets and destinations that relate to publish-time directory and link manipulation (i.e. remove base folder path, include target path, destination path, etc.).
-   Links in page content are not rewritten during database publishing, and should reflect the in-CMS path of the entities the records represent.
-   After particular sequences of publishes, deletes, and unpublishes (or lack thereof), the state of the external database should be considered.

For example, a folder containing two pages:

-   Folder
    -   Page 1
    -   Page 2

The folder, its pages, and their associated metadata would be written to the external database if a user were to publish this folder to a destination backed by a database transport. Page 1 is then deleted and the folder is republished. If the external database was examined, it would be discovered that Page 1 still has records therein. In database publishing as in normal publishing, it is assumed that users will indicate exactly which assets they want unpublished from their destination.

If the same asset is published to destinations using different database transports, this may result in several files, pages, and folders in the external database with the same cms\_id. It is important to know what criteria to include in SQL queries to ensure that the correct records are being operated on. The *cms\_id*, *the account\_id*, and the *site\_id* of the assets being operated on should match those on which the user intends to operate. The *folder\_id* of records in the remote database corresponds to the *cms\_id* of its parent folder, and not to the *folder\_id*.

If a user was dealing with a site with id=5 and an account with id=1, and wanted to get the parent folder of a file named ‘koko.png’ in the external database, the file record would appear in the external database like so:

Sample database record for 'koko.png'
| 
id

 | 

account\_id

 | 

site\_id

 | 

cms\_id

 | 

folder\_id

 | 

metadata\_id

 | 

name

 | 

path

 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

9

 | 

1

 | 

5

 | 

92436e0a7f00010100b2eca959237ccd

 | 

92436dc67f00010100b2eca953a7298f

 | 

10

 | 

koko.png

 | 

site5/images/koko.pn

 |

The desired folder record would appear like so:

Sample database record for the parent folder of 'koko.png'
| 
id

 | 

account\_id

 | 

site\_id

 | 

cms\_id

 | 

folder\_id

 | 

metadata\_id

 | 

name

 | 

path

 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

3

 | 

1

 | 

5

 | 

92434dc67f00010100b2eca953a7298f

 | 

9a436dc67f00010100b2eca234526666

 | 

10

 | 

images

 | 

site5/image

 |

In order to select this record, the correct query would be:

`SELECT * FROM folder WHERE cms_id='92436dc67f00010100b2eca953a7298f' AND site_id=5 AND account_id=1;`

It is possible that there is another record corresponding to the images folder in the external database with the same *cms\_id*, but with a different *account\_id*, *site\_id*, or both. If the expressions restricting the *site\_id* and *account\_id* were omitted from the query above, multiple folders would be returned in the result.

# Amazon S3 Transports[](#AmazonS3Transports)

Amazon's Simple Storage Service (S3) can be used for hosting static resources such as images, PDFs, CSS, or JS. You can also publish and host entire sites, including page content, on S3 and serve them through a custom domain on CloudFront.

To publish using an S3 Transport, you'll need an Access Key, which allows a program, script, or developer to have full programmatic access to the resources on your account. A sample S3 JSON Policy with the minimum required privileges can be found below (replace *bucketName* with the name of your bucket):

`{     "Version": "2012-10-17",     "Statement": [         {             "Effect": "Allow",             "Action": [                 "s3:DeleteObject",                 "s3:GetObject",                 "s3:PutObject",                 "s3:PutObjectAcl",                 "s3:ListBucket"             ],             "Resource": [                 "arn:aws:s3:::bucketName/*",                 "arn:aws:s3:::bucketName"             ]         }     ] }`

## On-premise Customers Older pre-v8.22.1

`{     "Version": "2012-10-17",     "Statement": [         {             "Effect": "Allow",             "Action": [                 "s3:ListAllMyBuckets"             ],             "Resource": [                 "arn:aws:s3:::*"             ]         },         {             "Effect": "Allow",             "Action": [                 "s3:DeleteObject",                 "s3:GetObject",                 "s3:PutObject",                 "s3:PutObjectAcl"             ],             "Resource": [                 "arn:aws:s3:::bucketName/*"             ]         }     ] }`

**On-premise customers pre-v8.22.1:** the Permissions tab for your S3 bucket must have the **Block new public ACLs and uploading public objects**option *disabled*. Without that setting disabled, you may encounter **Access Denied** errors when attempting to publish to your S3 bucket. Other causes for this error and steps to resolve them can be found on [the Amazon S3 Troubleshooting page](https://aws.amazon.com/premiumsupport/knowledge-center/s3-troubleshoot-403/ "Troubleshooting S3 HTTP 403: Access Denied").

To create an Amazon S3 Transport:

1.  Navigate to **Manage Site** > **Transports**.
2.  Navigate to the container in which the new Transport will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Transport**.
4.  Select **Amazon S3** and click **Choose**.
5.  In the **Name** field, enter the name for your Transport.
6.  In the **Parent Container** field, select a container for the Transport, if desired.
7.  Under **Amazon S3 Transport Settings**, configure the following fields:
    -   **AWS User Access Key ID**
    -   **AWS User Secret Key**
    -   **S3 Bucket Name**\- Name of an S3 bucket to which the AWS Access Key user above has write access.
    -   **Base Path**\- Optional, assets will be published in this folder within your S3 bucket.
8.  Click **Submit**.

### Linking

To ensure links to assets published to S3, either on their own or as part of a CloudFront distribution, from assets that aren't published there are valid, be sure to use the S3 bucket's URL (including the Base Path) or the CloudFront distribution's URL (including the Base Path) as the site URL or Destination's Web URL.  
  
As a best practice, you'll want to manage your S3 published assets in a separate site so the system can easily tell which URL to use when generating links.

# Testing Transport Connectivity[](#TestingTransportConnectivity)

The Transport test utility allows users to test Transport connectivity without invoking a publish. To run a Transport test:

1.  Navigate to **Manage Site** > **Transports**.
2.  Select the Transport you wish to test.
3.  Click **More** > **Test Connectivity**.
4.  Click **Start Test**. If there are no errors, the screen will indicate "Test Successful!" If errors are found, the screen will identify the problem that occurred.

[↑](#top)

# Related Links

-   [Which algorithms are supported for SFTP?](https://www.hannonhill.com/cascadecms/latest/faqs/general/which-algorithms-are-supported-for-sftp.html)