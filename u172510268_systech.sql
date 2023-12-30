-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 30, 2023 at 08:47 AM
-- Server version: 10.6.15-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u172510268_systech`
--

DELIMITER $$
--
-- Procedures
--
$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMCaderwiseDeduction` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pCaderwiseDeductionId` VARCHAR(5), `pEmployeeTypeId` VARCHAR(5), `pCaderwiseDeductionDate` DATETIME(3), `pDeductionHeadId` VARCHAR(5), `pDeductionHead` VARCHAR(500), `pDCalculationType` VARCHAR(10), `pDCalculationValue` DECIMAL(10,2), `pFormula` VARCHAR(500), `pRemark` VARCHAR(1000), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
Declare v_EmployeeType varchar(50);
Declare v_EmployeeTypeGroup varchar(10);

Start Transaction; 
If pIUFlag='I'
	Then
	
	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select EmployeeTypeGroup Into v_EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId=pEmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select ShortName Into v_EmployeeType from MEmployeeType  Where    EmployeeTypeId=pEmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   
		--  SQLINES DEMO *** *) from MCaderwiseDeduction Where CaderwiseDeductionId=@CaderwiseDeductionId   and CompanyId =@CompanyId and BranchId=@BranchId
		-- if @Cnt > 0 
		-- Begin
		-- SQLINES DEMO *** 'EarningHeads Record  Already Exist !!'
		-- SQLINES DEMO *** 00'
		-- SQLINES DEMO *** ion
		--	return
		-- End

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Insert into MCaderwiseDeduction (CompanyId ,BranchId,CaderwiseDeductionId,EmployeeTypeId, CaderwiseDeductionDate,EmployeeType ,EmployeeTypeGroup, DeductionHeadId,DeductionHead ,DCalculationType ,DCalculationValue, Formula, Remark,AcFlag,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn) values
				(pCompanyId,pBranchId,pCaderwiseDeductionId,pEmployeeTypeId,str_to_date(now(3),103),v_EmployeeType,v_EmployeeTypeGroup ,pDeductionHeadId ,pDeductionHead ,pDCalculationType ,pDCalculationValue,pFormula, pRemark ,pAcFlag ,pCreatedBy ,str_to_date(now(3),103) ,pModifiedBy,str_to_date(now(3),103));  
		
		--  SQLINES DEMO *** rningHeads Record  Inserted Successfully !!'
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='401';
		Commit;
		leave splbl;		
	End if;
	-- Else If @IUFlag='U'
	-- Begin

	-- SQLINES DEMO *** eTypeGroup=EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId
	-- SQLINES DEMO *** eType=EmployeeType from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId

	-- SQLINES DEMO *** (*) from MCaderwiseDeduction Where  CaderwiseDeductionId <> @CaderwiseDeductionId and CompanyId =@CompanyId and BranchId=@BranchId
	--	if @Cnt > 0 
	--	Begin
	-- SQLINES DEMO *** ='EarningHeads Record Already Exist !!'
	-- SQLINES DEMO *** '400'
	-- SQLINES DEMO *** tion
	--		return
	--	End
	--  SQLINES DEMO *** wiseDeduction (CompanyId ,BranchId,CaderwiseDeductionId,EmployeeTypeId, MappingDate,EmployeeType ,EmployeeTypeGroup, DeductionHeadId,DeductionHead ,CalculationType ,CalculationValue,Remark,AcFlag,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn) values
	-- SQLINES DEMO *** anchId,@CaderwiseDeductionId,@EmployeeTypeId,convert(datetime,getdate(),103),@EmployeeType,@EmployeeTypeGroup ,@DeductionHeadId ,@DeductionHead ,@CalculationType ,@CalculationValue, @Remark ,@AcFlag ,@CreatedBy ,convert(datetime,getdate(),103) ,@ModifiedBy,convert(datetime,getdate(),103))  
	-- SQLINES DEMO *** '402'
	-- SQLINES DEMO ***  ' EarningHeads Record  Updated Successfully !!'
	--	Commit Transaction
	--	return		
	-- End
	-- Else If @IUFlag='D'
	-- Begin
	-- SQLINES DEMO *** eDeduction Set 
				
	--	AcFlag ='N'
	-- SQLINES DEMO *** eductionId=@CaderwiseDeductionId and CompanyId =@CompanyId and BranchId=@BranchId
	-- SQLINES DEMO *** '403'
	-- SQLINES DEMO ***  ' EarningHeads Record Deleted Successfully !!'
	--	Commit Transaction
	--	return		
	
	-- End














END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMCaderwiseEarning` (IN `pCompanyId` VARCHAR(5), IN `pBranchId` VARCHAR(5), IN `pCaderwiseEarningId` VARCHAR(5), IN `pEmployeeTypeId` VARCHAR(5), IN `pCaderwiseEarningDate` DATETIME(3), IN `pEarningHeadId` VARCHAR(5), IN `pEarningHead` VARCHAR(500), IN `pECalculationType` VARCHAR(10), IN `pECalculationValue` DECIMAL(10,2), IN `pFormula` VARCHAR(500), IN `pRemark` VARCHAR(1000), IN `pAcFlag` VARCHAR(1), IN `pCreatedBy` VARCHAR(500), IN `pModifiedBy` VARCHAR(500), IN `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
Declare v_EmployeeType varchar(50);
Declare v_EmployeeTypeGroup varchar(10);

Start Transaction; 
If pIUFlag='I'
	Then
	
	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select EmployeeTypeGroup Into v_EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId=pEmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select ShortName Into v_EmployeeType from MEmployeeType  Where    EmployeeTypeId=pEmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   
		--  SQLINES DEMO *** *) from MCaderwiseEarning Where CaderwiseEarningId=@CaderwiseEarningId   and CompanyId =@CompanyId and BranchId=@BranchId
		-- if @Cnt > 0 
		-- Begin
		-- SQLINES DEMO *** 'EarningHeads Record  Already Exist !!'
		-- SQLINES DEMO *** 00'
		-- SQLINES DEMO *** ion
		--	return
		-- End

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Insert into MCaderwiseEarning (CompanyId ,BranchId,CaderwiseEarningId,EmployeeTypeId, CaderwiseEarningDate,EmployeeType ,EmployeeTypeGroup, EarningHeadId,EarningHead ,ECalculationType ,ECalculationValue,Formula,Remark,AcFlag,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn) values
				(pCompanyId,pBranchId,pCaderwiseEarningId,pEmployeeTypeId,pCaderwiseEarningDate,v_EmployeeType,v_EmployeeTypeGroup ,pEarningHeadId ,pEarningHead ,pECalculationType ,pECalculationValue,pFormula, pRemark ,pAcFlag ,pCreatedBy ,str_to_date(now(3),103) ,pModifiedBy,str_to_date(now(3),103));  
		
		--  SQLINES DEMO *** rningHeads Record  Inserted Successfully !!'
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='401';
		Commit;
		leave splbl;		
	-- Else If @IUFlag='U'
	-- Begin

	--  SQLINES DEMO *** peGroup=EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId
	-- SQLINES DEMO *** eType=EmployeeType from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId


	-- SQLINES DEMO *** (*) from MCaderwiseEarning Where  CaderwiseEarningId <> @CaderwiseEarningId and CompanyId =@CompanyId 
	--	if @Cnt > 0 
	--	Begin
	-- SQLINES DEMO *** ='EarningHeads Record Already Exist !!'
	-- SQLINES DEMO *** '400'
	-- SQLINES DEMO *** tion
	--		return
	--	End
	-- SQLINES DEMO *** rwiseEarning (CompanyId ,BranchId,CaderwiseEarningId,EmployeeTypeId, MappingDate,EmployeeType ,EmployeeTypeGroup, EarningHeadId,EarningHead ,CalculationType ,CalculationValue,Remark,AcFlag,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn) values
	-- SQLINES DEMO *** anchId,@CaderwiseEarningId,@EmployeeTypeId,convert(datetime,getdate(),103),@EmployeeType,@EmployeeTypeGroup ,@EarningHeadId ,@EarningHead ,@CalculationType ,@CalculationValue, @Remark ,@AcFlag ,@CreatedBy ,convert(datetime,getdate(),103) ,@ModifiedBy,convert(datetime,getdate(),103))  
		
	-- SQLINES DEMO *** '402'
	-- SQLINES DEMO ***  ' EarningHeads Record  Updated Successfully !!'
	--	Commit Transaction
	--	return		
	-- End
	Elseif pIUFlag='D'
	Then
	  Update MCaderwiseEarning Set 
				
		AcFlag ='N'
		 Where CaderwiseEarningId=pCaderwiseEarningId and CompanyId =pCompanyId and BranchId=pBranchId;
		 	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	 		Set pResult='403';
		--  SQLINES DEMO *** EarningHeads Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
End if;
	









END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMCompany` (IN `pCompanyId` INT(5), IN `pCompanySectorId` VARCHAR(500), IN `pCompanyName` VARCHAR(500), IN `pShortName` VARCHAR(3), IN `pNatureOfBusiness` VARCHAR(1000), IN `pLogo` VARCHAR(1000), IN `pAcFlag` CHAR(1), IN `pSingleCompany` CHAR(1), IN `pCreatedBy` VARCHAR(500), IN `pModifiedBy` VARCHAR(500), IN `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   BEGIN
  DECLARE vErr INT;
  DECLARE vCnt INT;

  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET vErr = 1;

  START TRANSACTION;
  
  IF pIUFlag = 'I' THEN
    SELECT COUNT(*) INTO vCnt FROM MCompany WHERE CompanyId = pCompanyId;
    IF vCnt > 0 THEN
      SET pResult = 'Record Already Exists !!';
      ROLLBACK;
    ELSE
      INSERT INTO MCompany (
        CompanyId, 
        CompanySectorId, 
        CompanyName,
        ShortName, 
        NatureOfBusiness, 
        Logo,
        AcFlag,
        CreatedBy,
        CreatedOn,
        ModifiedBy,
        ModifiedOn,
        SingleCompany
      ) VALUES (
        pCompanyId,
        pCompanySectorId,
        pCompanyName,
        pShortName,
        pNatureOfBusiness,
        pLogo,
        pAcFlag,
        pCreatedBy,
        NOW(),
        pModifiedBy,
        NOW(),
        pSingleCompany
      );
      SET pResult = 'Record Inserted Successfully !!';
      COMMIT;
    END IF;
  ELSEIF pIUFlag = 'U' THEN
    SELECT COUNT(*) INTO vCnt FROM MCompany WHERE CompanyId <> pCompanyId;
    IF vCnt > 0 THEN
      SET pResult = 'Record Already Exists !!';
      ROLLBACK;
    ELSE
      UPDATE MCompany
      SET
        CompanySectorId = pCompanySectorId,
        CompanyName = pCompanyName,
        ShortName = pShortName,
        NatureOfBusiness = pNatureOfBusiness,
        Logo = pLogo,
        AcFlag = pAcFlag,
        ModifiedBy = pModifiedBy,
        SingleCompany = pSingleCompany,
        ModifiedOn = NOW()
      WHERE CompanyId = pCompanyId;
      SET pResult = 'Record Updated Successfully !!';
      COMMIT;
    END IF;
ELSEIF pIUFlag = 'D' THEN
  SELECT COUNT(*) INTO vCnt FROM MCompany WHERE CompanyId = pCompanyId;
  IF vCnt > 0 THEN
    UPDATE MCompany
    SET AcFlag = 'N'
    WHERE CompanyId = pCompanyId;
    SET pResult = 'Record Deleted Successfully !!';
    COMMIT;
  ELSE
    SET pResult = 'Record Not Found !!';
    ROLLBACK;
  END IF;
END IF;
END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMCostCenter` (IN `p_CompanyId` VARCHAR(5), IN `p_BranchId` VARCHAR(5), IN `p_CostCenterId` VARCHAR(5), IN `p_CostCenterName` VARCHAR(50), IN `p_AcFlag` VARCHAR(1), IN `p_CreatedBy` VARCHAR(500), IN `p_ModifiedBy` VARCHAR(500), IN `p_IUFlag` VARCHAR(1), IN `p_Remark` VARCHAR(500), OUT `p_Result` VARCHAR(100))   BEGIN
    DECLARE Err INT;
    DECLARE Cnt INT;

    START TRANSACTION;

    IF p_IUFlag = 'I' THEN
        SELECT COUNT(*) INTO Cnt FROM MCostCenter WHERE CostCenterName = p_CostCenterName AND CompanyId = p_CompanyId AND BranchId = p_BranchId;
        
        IF Cnt > 0 THEN
            SET p_Result = '400';
            ROLLBACK;
        ELSE
            INSERT INTO MCostCenter (CompanyId, BranchId, CostCenterId, CostCenterName, AcFlag, Remark, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
            VALUES (p_CompanyId, p_BranchId, p_CostCenterId, p_CostCenterName, p_AcFlag, p_Remark, p_CreatedBy, NOW(), p_ModifiedBy, NOW());

            SET p_Result = '401';
            COMMIT;
        END IF;
    ELSEIF p_IUFlag = 'U' THEN
        SELECT COUNT(*) INTO Cnt FROM MCostCenter WHERE CostCenterName = p_CostCenterName AND CostCenterId <> p_CostCenterId AND CompanyId = p_CompanyId AND BranchId = p_BranchId;

        IF Cnt > 0 THEN
            SET p_Result = '400';
            ROLLBACK;
        ELSE
            UPDATE MCostCenter
            SET
                CostCenterName = p_CostCenterName,
                Remark = p_Remark,
                AcFlag = p_AcFlag,
                ModifiedBy = p_ModifiedBy,
                ModifiedOn = NOW()
            WHERE CostCenterId = p_CostCenterId AND CompanyId = p_CompanyId AND BranchId = p_BranchId;

            SET p_Result = '402';
            COMMIT;
        END IF;
    ELSEIF p_IUFlag = 'D' THEN
        UPDATE MCostCenter
        SET
            AcFlag = 'N'
        WHERE CostCenterId = p_CostCenterId AND CompanyId = p_CompanyId AND BranchId = p_BranchId;

        SET p_Result = '403';
        COMMIT;
    END IF;
END$$

$$

$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMDesignation` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pDesignationId` VARCHAR(5), `pDesignationName` VARCHAR(50), `pReportDesignationId` VARCHAR(5), `pShortName` VARCHAR(3), `pDesignationsPosition` INT, `pAcFlag` VARCHAR(1), `pRemark` VARCHAR(500), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from MDesignation Where  DesignationName =pDesignationName and CompanyId =pCompanyId and BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** ployeeType  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		
	
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Insert into MDesignation (CompanyId ,BranchId, DesignationId , DesignationName , ReportDesignationId,ShortName,DesignationsPosition,AcFlag,Remark ,CreatedBy ,CreatedOn ,ModifiedBy,ModifiedOn   ) values
				(pCompanyId ,pBranchId,pDesignationId ,pDesignationName,pReportDesignationId,pShortName ,pDesignationsPosition ,pAcFlag,pRemark ,pCreatedBy ,str_to_date(now(3),103) ,pModifiedBy,str_to_date(now(3),103)  );  
		
		--  SQLINES DEMO *** ployeeType  Record Inserted Successfully !!'
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='401';
		Commit;
		leave splbl;		
	Elseif pIUFlag='U'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from MDesignation Where DesignationName=pDesignationName and DesignationId<> pDesignationId  and CompanyId =pCompanyId  and BranchId=pBranchId;
		if v_Cnt > 0 
		Then
		-- SQLINES DEMO *** Designation Already Exist !!'
				-- SQLINES LICENSE FOR EVALUATION USE ONLY
				Set pResult='400';
			Rollback;
			leave splbl;
		End if;


		Update MDesignation Set 
		
		DesignationName=pDesignationName,
		ReportDesignationId=pReportDesignationId,
		ShortName=pShortName,DesignationsPosition=pDesignationsPosition,
		AcFlag =pAcFlag ,
		Remark= pRemark,
		ModifiedBy =pModifiedBy,
	    ModifiedOn =str_to_date(now(3),103)
		 Where DesignationId=pDesignationId and CompanyId =pCompanyId and BranchId=pBranchId;
		 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 		Set pResult='402';
		--  SQLINES DEMO *** EmployeeType Record Updated Successfully !!'
		Commit;
		leave splbl;		
	Elseif pIUFlag='D'
	Then
	  Update MDesignation Set 
		
		
		AcFlag ='N'
		 Where DesignationId=pDesignationId and CompanyId =pCompanyId  and BranchId=pBranchId;
		 	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	 		Set pResult='403';
		--  SQLINES DEMO *** EmployeeType Record Deleted Successfully !!'
		Commit;
		leave splbl;		

	End if;














END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMDevice` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pDeviceId` VARCHAR(5), `pDeviceName` VARCHAR(100), `pIpAddress` VARCHAR(100), `pPortNo` VARCHAR(100), `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	

	If pIUFlag='I'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from MDevice Where  DeviceName =pDeviceName and DeviceId <> pDeviceId  and CompanyId =pCompanyId   and  BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='Entry Already Exist !!';
			Rollback;
			leave splbl;
		End if;

		
	
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Insert into MDevice (CompanyId,BranchId,DeviceId,DeviceName,IpAddress,PortNo,Remark,AcFlag ,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		values
				(pCompanyId,pBranchId,pDeviceId,pDeviceName,pIpAddress,pPortNo ,pRemark,pAcFlag ,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));
		
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='Device Inserted Successfully !!';
		Commit;
		leave splbl;		
	Elseif pIUFlag='U'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from MDevice Where DeviceName =pDeviceName and DeviceId <> pDeviceId  and CompanyId =pCompanyId   and  BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='Entry Already Exist !!';
			Rollback;
			leave splbl;
		End if;


		Update MDevice Set DeviceName=pDeviceName,
		IpAddress=pIpAddress,
		PortNo=pPortNo,
		AcFlag =pAcFlag,
		CreatedBy=pCreatedBy ,
		CreatedOn=str_to_date(now(3),103),
		ModifiedBy = pModifiedBy, 
		ModifiedOn =str_to_date(now(3),103) 
		 Where DeviceId=pDeviceId and CompanyId=pCompanyId  and  BranchId=pBranchId;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='Device Updated Successfully !!';
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MDevice Set
	  AcFlag='N'
	  Where DeviceId = pDeviceId and CompanyId = pCompanyId  and  BranchId=pBranchId;
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** Destination Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;
END$$

$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployee` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pEmployeeId` VARCHAR(5), `pEmployeeTypeId` VARCHAR(5), `pEmployeeTypeGroupId` VARCHAR(5), `pEmployeeName` VARCHAR(500), `pSalutation` VARCHAR(5), `pLastName` VARCHAR(500), `pFirstName` VARCHAR(500), `pMiddleName` VARCHAR(500), `pMEmployeeName` VARCHAR(500), `pAadharCardNo` VARCHAR(100), `pPANNo` VARCHAR(100), `pPassportNo` VARCHAR(100), `pPassportIssueDate` DATETIME(3), `pPassportExpireDate` DATETIME(3), `pCurrentAddress` VARCHAR(1000), `pCurrentPincode` VARCHAR(10), `pPermanantAddress` VARCHAR(1000), `pPermanantPincode` VARCHAR(10), `pDOB` DATETIME(3), `pEmailId1` VARCHAR(100), `pEmailId2` VARCHAR(100), `pPhoneNo` VARCHAR(15), `pCellNo1` VARCHAR(15), `pCellNo2` VARCHAR(15), `pBankId1` VARCHAR(5), `pAccountNo1` VARCHAR(100), `pIFSCCode1` VARCHAR(50), `pBankId2` VARCHAR(5), `pAccountNo2` VARCHAR(100), `pIFSCCode2` VARCHAR(50), `pMaritalStatus` VARCHAR(15), `pReferenceId` VARCHAR(5), `pDestinationId` VARCHAR(5), `pReligionId` VARCHAR(5), `pCategoryId` VARCHAR(5), `pCasteId` VARCHAR(5), `pEmployeePhoto` VARCHAR(1000), `pGender` VARCHAR(10), `pBloodGroup` VARCHAR(10), `pDrivingLicence` VARCHAR(500), `pFinanceAccountNo` VARCHAR(100), `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(5), `pModifiedBy` VARCHAR(5), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MEmployee Where   LastName=pLastName  and FirstName=pFirstName and MiddleName=pMiddleName and CompanyId =pCompanyId and  BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** ployee Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MEmployee(CompanyId, BranchId,EmployeeId,EmployeeName,EmployeeTypeId,EmployeeTypeGroupId,Salutation,LastName,FirstName,MiddleName,MEmployeeName,AadharCardNo,PANNo,PassportNo,PassportIssueDate,PassportExpireDate,CurrentAddress,CurrentPincode,PermanantAddress,PermanantPincode,DOB,PhoneNo,CellNo1,CellNo2,EmailId1,EmailId2,BankId1,AccountNo1,IFSCCode1,BankId2,AccountNo2,IFSCCode2,MaritalStatus,ReferenceId,DestinationId  ,ReligionId  ,CategoryId  ,CasteId ,EmployeePhoto  ,Gender,BloodGroup  ,DrivingLicence ,FinanceAccountNo ,Remark ,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pEmployeeId,pEmployeeName,pEmployeeTypeId,pEmployeeTypeGroupId,pSalutation,pLastName,pFirstName,pMiddleName,pMEmployeeName,pAadharCardNo,pPANNo,pPassportNo,str_to_date(now(3),103),str_to_date(now(3),103),pCurrentAddress,pCurrentPincode,pPermanantAddress,pPermanantPincode,str_to_date(now(3),103),pPhoneNo,pCellNo1,pCellNo2,pEmailId1,pEmailId2,pBankId1,pAccountNo1,pIFSCCode1,pBankId2,pAccountNo2,pIFSCCode2,pMaritalStatus  ,pReferenceId,pDestinationId  ,pReligionId  ,pCategoryId  ,pCasteId ,pEmployeePhoto  ,pGender,pBloodGroup  ,pDrivingLicence ,pFinanceAccountNo ,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				-- SQLINES LICENSE FOR EVALUATION USE ONLY
				Set pResult='Employee NRecord Inserted Successfully!';
		  -- Select @Result='401'
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MEmployee Where LastName=pLastName  and FirstName=pFirstName and MiddleName=pMiddleName and EmployeeId <> pEmployeeId and CompanyId=pCompanyId and  BranchId=pBranchId;
	if v_Cnt > 0
	Then
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='Employee Already Exist !!';
	-- Select @Result='400'
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MEmployee  SET 
	EmployeeTypeId = pEmployeeTypeId,
	 EmployeeTypeGroupId = pEmployeeTypeGroupId,
	  Salutation=pSalutation,
	  LastName=pLastName,
	  FirstName=pFirstName,
	  MiddleName=pMiddleName,
	  MEmployeeName=pMEmployeeName,
	  AadharCardNo=pAadharCardNo,
	  PANNo=pPANNo,
	  PassportNo=pPassportNo,
	  PassportIssueDate=str_to_date(now(3),103),
	  PassportExpireDate=str_to_date(now(3),103),
	  CurrentAddress=pCurrentAddress,
	  CurrentPincode=pCurrentPincode,
	  PermanantAddress=pPermanantAddress,
	  DOB=str_to_date(now(3),103),
	  PhoneNo=pPhoneNo,
	  CellNo1=pCellNo1,
	  CellNo2=pCellNo2,
	  EmailId1=pEmailId1,
	  EmailId2=pEmailId2,
	  BankId1=pBankId1,
	  AccountNo1=pAccountNo1,
	  IFSCCode1=pIFSCCode1,
	  BankId2=pBankId2,
	  AccountNo2=pAccountNo2,
	  IFSCCode2=pIFSCCode2,
	  MaritalStatus=pMaritalStatus ,
		ReferenceId=pReferenceId,
		DestinationId=pDestinationId  ,
		 ReligionId =pReligionId ,
		 CategoryId =pCategoryId ,
		 CasteId=pCasteId ,
		 EmployeePhoto=pEmployeePhoto,Gender=pGender,BloodGroup =pBloodGroup ,DrivingLicence=pDrivingLicence ,FinanceAccountNo=pFinanceAccountNo ,Remark=pRemark,
	 AcFlag = pAcFlag,
	 ModifiedBy = pModifiedBy, 
	 ModifiedOn =str_to_date(now(3),103)
      Where EmployeeId=pEmployeeId and CompanyId=pCompanyId and  BranchId=pBranchId;
	
	 -- Select @Result='402'
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult= ' Employee Record Updated Successfully !!';
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MEmployee Set
	  AcFlag='N'
	  Where EmployeeId = pEmployeeId and CompanyId = pCompanyId and  BranchId=pBranchId;
	  -- Select @Result='403'
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult= ' Employee Record Deleted Successfully !!';
		Commit;
		leave splbl;		
	
	End if;












END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeeAcademic` (IN `pCompanyId` VARCHAR(5), IN `pBranchId` VARCHAR(5), IN `pEmployeeId` INT, IN `pQualification` VARCHAR(350), IN `pInstitute` VARCHAR(500), IN `pSpecialization` VARCHAR(500), IN `pGrades` VARCHAR(1000), IN `pPassingYear` VARCHAR(15), IN `pRemark` VARCHAR(1000), IN `pAcFlag` VARCHAR(1), IN `pCreatedBy` VARCHAR(5), IN `pCreatedOn` DATE, IN `pModifiedBy` VARCHAR(5), IN `pModifiedOn` DATE, IN `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
    DECLARE v_Err INT;
    DECLARE v_Cnt INT;

    START TRANSACTION;

    IF pIUFlag = 'I' THEN
        -- Insert logic
        INSERT INTO MEmployeeAcademic (
            CompanyId, BranchId, EmployeeId, Qualification, Institute, Specialization,
            Grades, PassingYear, Remark, AcFlag, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn
        )
        VALUES (
            pCompanyId, pBranchId, pEmployeeId, pQualification, pInstitute, pSpecialization,
            pGrades, pPassingYear, pRemark, pAcFlag, pCreatedBy, pCreatedOn, pModifiedBy, pModifiedOn
        );

        SET pResult = '401'; -- Success code for insert

    ELSEIF pIUFlag = 'U' THEN
        -- Update logic
        UPDATE MEmployeeAcademic
        SET
            Qualification = pQualification,
            Institute = pInstitute,
            Specialization = pSpecialization,
            Grades = pGrades,
            PassingYear = pPassingYear,
            Remark = pRemark,
            AcFlag = pAcFlag,
            ModifiedBy = pModifiedBy,
            ModifiedOn = pModifiedOn
        WHERE
            EmployeeId = pEmployeeId AND
            CompanyId = pCompanyId AND
            BranchId = pBranchId;

        SET pResult = '402'; -- Success code for update

    ELSEIF pIUFlag = 'D' THEN
        -- Delete logic
        UPDATE MEmployeeAcademic
        SET AcFlag = 'N'
        WHERE EmployeeId = pEmployeeId AND CompanyId = pCompanyId AND BranchId = pBranchId;

        SET pResult = '403'; -- Success code for delete
    END IF;

    COMMIT;
    LEAVE splbl;

END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeeFamily` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pEmployeeId` INT, `pPersonName` VARCHAR(350), `pRelation` VARCHAR(500), `pEducation` VARCHAR(500), `pOccupation` VARCHAR(500), `pAddress` VARCHAR(500), `pCellNo` VARCHAR(500), `pEmailId` VARCHAR(500), `pNominee` VARCHAR(1), `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(5), `pCreatedOn` DATE, `pModifiedBy` VARCHAR(5), `pModifiedOn` DATE, `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
    DECLARE v_Err INT;
    DECLARE v_Cnt INT;

    START TRANSACTION;

    IF pIUFlag = 'I' THEN
        -- Insert logic
        INSERT INTO MEmployeeFamily (
            CompanyId, BranchId, EmployeeId, PersonName, Relation, Education,
            Occupation, Address, CellNo, EmailId, Nominee, Remark, AcFlag,
            CreatedBy, CreatedOn, ModifiedBy, ModifiedOn
        )
        VALUES (
            pCompanyId, pBranchId, pEmployeeId, pPersonName, pRelation, pEducation,
            pOccupation, pAddress, pCellNo, pEmailId, pNominee, pRemark, pAcFlag,
            pCreatedBy, pCreatedOn, pModifiedBy, pModifiedOn
        );

        SET pResult = '401'; -- Success code for insert

    ELSEIF pIUFlag = 'U' THEN
        -- Update logic
        UPDATE MEmployeeFamily
        SET
            PersonName = pPersonName,
            Relation = pRelation,
            Education = pEducation,
            Occupation = pOccupation,
            Address = pAddress,
            CellNo = pCellNo,
            EmailId = pEmailId,
            Nominee = pNominee,
            Remark = pRemark,
            AcFlag = pAcFlag,
            ModifiedBy = pModifiedBy,
            ModifiedOn = pModifiedOn
        WHERE
            EmployeeId = pEmployeeId AND
            CompanyId = pCompanyId AND
            BranchId = pBranchId;

        SET pResult = '402'; -- Success code for update

    ELSEIF pIUFlag = 'D' THEN
        -- Delete logic
        UPDATE MEmployeeFamily
        SET AcFlag = 'N'
        WHERE EmployeeId = pEmployeeId AND CompanyId = pCompanyId AND BranchId = pBranchId;

        SET pResult = '403'; -- Success code for delete
    END IF;

    COMMIT;
    LEAVE splbl;

END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeeGrade` (`pCompanyId` VARCHAR(5), `pEmployeeGradeId` VARCHAR(5), `pBranchId` VARCHAR(5), `pEmployeeGradeName` VARCHAR(500), `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(5), `pModifiedBy` VARCHAR(5), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MEmployeeGrade Where   EmployeeGradeName=pEmployeeGradeName and BranchId=pBranchId  and CompanyId =pCompanyId; 
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** stination Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MEmployeeGrade (CompanyId,BranchId,EmployeeGradeId, EmployeeGradeName,  Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pEmployeeGradeId, pEmployeeGradeName ,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				--  SQLINES DEMO *** stination NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MEmployeeGrade Where EmployeeGradeName=pEmployeeGradeName and BranchId=pBranchId and EmployeeGradeId <> pEmployeeGradeId and CompanyId=pCompanyId; 
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** stination Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MEmployeeGrade  SET 
	EmployeeGradeName= pEmployeeGradeName, Remark=pRemark, AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where  EmployeeGradeId=pEmployeeGradeId and CompanyId=pCompanyId  and  BranchId=pBranchId;
      
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Destination Record Updated Successfully !!'
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MEmployeeGrade Set
	  AcFlag='N'
	  Where EmployeeGradeId = pEmployeeGradeId and CompanyId = pCompanyId  and  BranchId=pBranchId;
      
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** Destination Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;






END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeeProfessional` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pEmployeeId` INT, `pEmployer` VARCHAR(350), `pExperience` VARCHAR(500), `pDesignation` VARCHAR(500), `pJobResponsibility` VARCHAR(1000), `pSalary` VARCHAR(500), `pCVFile` VARCHAR(500), `pSalarySlipFile` VARCHAR(500), `pAcFlag` VARCHAR(1), `pRemark` VARCHAR(1000), `pCreatedBy` VARCHAR(5), `pCreatedOn` VARCHAR(10), `pModifiedBy` VARCHAR(5), `pModifiedOn` VARCHAR(10), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
    DECLARE v_Err INT;
    DECLARE v_Cnt INT;

    START TRANSACTION;

    IF pIUFlag = 'I' THEN
        -- Insert logic
        -- SQLINES LICENSE FOR EVALUATION USE ONLY
        INSERT INTO MEmployeeProfessional (
            CompanyId, BranchId, EmployeeId, Employer, Experience, Designation,
            JobResponsibility, Salary, CVFile, SalarySlipFile, AcFlag, Remark,
            CreatedBy, CreatedOn, ModifiedBy, ModifiedOn
        )
        VALUES (
            pCompanyId, pBranchId, pEmployeeId, pEmployer, pExperience, pDesignation,
            pJobResponsibility, pSalary, pCVFile, pSalarySlipFile, pAcFlag, pRemark,
            pCreatedBy, pCreatedOn, pModifiedBy, pModifiedOn
        );

        SET pResult = '401'; -- SQLINES DEMO *** insert

    ELSEIF pIUFlag = 'U' THEN
        -- Update logic
        UPDATE MEmployeeProfessional
        SET
            Employer = pEmployer,
            Experience = pExperience,
            Designation = pDesignation,
            JobResponsibility = pJobResponsibility,
            Salary = pSalary,
            CVFile = pCVFile,
            SalarySlipFile = pSalarySlipFile,
            AcFlag = pAcFlag,
            Remark = pRemark,
            ModifiedBy = pModifiedBy,
            ModifiedOn = pModifiedOn
        WHERE
            EmployeeId = pEmployeeId AND
            CompanyId = pCompanyId AND
            BranchId = pBranchId;

        SET pResult = '402'; -- SQLINES DEMO *** update

    ELSEIF pIUFlag = 'D' THEN
        -- Delete logic
        UPDATE MEmployeeProfessional
        SET AcFlag = 'N'
        WHERE EmployeeId = pEmployeeId AND CompanyId = pCompanyId AND BranchId = pBranchId;

        SET pResult = '403'; -- SQLINES DEMO *** delete
    END IF;

    COMMIT;
    LEAVE splbl;

END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeeSalary` (IN `pCompanyId` VARCHAR(5), IN `pBranchId` VARCHAR(5), IN `pEmployeeId` VARCHAR(5), IN `pGradeId` VARCHAR(5), IN `pBandId` VARCHAR(5), IN `pCTC` DECIMAL(10,2), IN `pSalary` DECIMAL(10,2), IN `pOTFlag` VARCHAR(1), IN `pOTAmount` DECIMAL(10,2), IN `pPFFlag` VARCHAR(1), IN `pPFNo` VARCHAR(50), IN `pPFDate` DATETIME(3), IN `pESICFlag` VARCHAR(1), IN `pESICNo` VARCHAR(50), IN `pESICDate` DATETIME(3), IN `pUANNo` VARCHAR(50), IN `pMLWFFlag` VARCHAR(1), IN `pMLWFNo` VARCHAR(50), IN `pGratuityApplicable` VARCHAR(1), IN `pGratuityAmount` DECIMAL(10,2), IN `pRemark` VARCHAR(500), IN `pAcFlag` VARCHAR(1), IN `pCreatedBy` VARCHAR(5), IN `pModifiedBy` VARCHAR(5), IN `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl: 
BEGIN
    DECLARE v_Err INT;
    DECLARE v_Cnt INT;

    START TRANSACTION;

    IF pIUFlag = 'I' THEN
        -- Insert logic
        INSERT INTO MEmployeeSalary (
            CompanyId, BranchId, GradeId, BandId, CTC, EmployeeId,
            Salary, OTFlag, OTAmount, PFFlag, PFNo, PFDate, ESICFlag,
            ESICNo, ESICDate, UANNo, MLWFFlag, MLWFNo, GratuityApplicable,
            GratuityAmount, Remark, AcFlag, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn
        )
        VALUES (
            pCompanyId, pBranchId, pGradeId, pBandId, pCTC, pEmployeeId,
            pSalary, pOTFlag, pOTAmount, pPFFlag, pPFNo, pPFDate, pESICFlag,
            pESICNo, pESICDate, pUANNo, pMLWFFlag, pMLWFNo, pGratuityApplicable,
            pGratuityAmount, pRemark, pAcFlag, pCreatedBy, NOW(3), pModifiedBy, NOW(3)
        );

        SET pResult = '401'; -- Success code for insert

    ELSEIF pIUFlag = 'U' THEN
        -- Update logic
        UPDATE MEmployeeSalary
        SET
            GradeId = pGradeId,
            BandId = pBandId,
            CTC = pCTC,
            Salary = pSalary,
            OTFlag = pOTFlag,
            OTAmount = pOTAmount,
            PFFlag = pPFFlag,
            PFNo = pPFNo,
            PFDate = pPFDate,
            ESICFlag = pESICFlag,
            ESICNo = pESICNo,
            ESICDate = pESICDate,
            UANNo = pUANNo,
            MLWFFlag = pMLWFFlag,
            MLWFNo = pMLWFNo,
            GratuityApplicable = pGratuityApplicable,
            GratuityAmount = pGratuityAmount,
            Remark = pRemark,
            AcFlag = pAcFlag,
            ModifiedBy = pModifiedBy,
            ModifiedOn = NOW(3)
        WHERE
            EmployeeId = pEmployeeId AND
            CompanyId = pCompanyId AND
            BranchId = pBranchId;

        SET pResult = '402'; -- Success code for update

    ELSEIF pIUFlag = 'D' THEN
        -- Delete logic
        UPDATE MEmployeeSalary
        SET AcFlag = 'N'
        WHERE EmployeeId = pEmployeeId AND CompanyId = pCompanyId AND BranchId = pBranchId;

        SET pResult = '403'; -- Success code for delete
    END IF;

    COMMIT;
    LEAVE splbl;

END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeeType` (`pCompanyId` VARCHAR(5), `pEmployeeTypeId` VARCHAR(3), `pEmployeeType` VARCHAR(50), `pEmployeeTypeGroup` VARCHAR(50), `pShortName` VARCHAR(1), `pBranchId` VARCHAR(5), `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(5), `pModifiedBy` VARCHAR(5), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MEmployeeType Where   EmployeeType=pEmployeeType   and CompanyId =pCompanyId and BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** ployeeType Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MEmployeeType (CompanyId,EmployeeTypeId, EmployeeType,EmployeeTypeGroup,ShortName,BranchId,Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pEmployeeTypeId, pEmployeeType,pEmployeeTypeGroup,pShortName,pBranchId,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				--  SQLINES DEMO *** stination NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MEmployeeType Where EmployeeType=pEmployeeType and EmployeeTypeId <> pEmployeeTypeId and CompanyId=pCompanyId and BranchId=pBranchId;
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** ployeeType Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MEmployeeType  SET 
	EmployeeType = pEmployeeType,ShortName=pShortName,EmployeeTypeGroup=pEmployeeTypeGroup,Remark=pRemark, AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where EmployeeTypeId=pEmployeeTypeId and CompanyId=pCompanyId and BranchId=pBranchId;
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** EmployeeType Record Updated Successfully !!'
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MEmployeeType Set
	  AcFlag='N'
	  Where EmployeeTypeId = pEmployeeTypeId and CompanyId = pCompanyId and BranchId=pBranchId;
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** EmployeeType Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;















END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeewiseDeduction` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pEmployeeId` VARCHAR(7), `pEmployeewiseDeductionId` VARCHAR(5), `pEmployeewiseDeductionDate` DATETIME(3), `pDeductionHead` VARCHAR(500), `pDCalculationType` VARCHAR(10), `pDCalculationValue` DECIMAL(10,2), `pFormula` VARCHAR(500), `pRemark` VARCHAR(1000), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(5), `pModifiedBy` VARCHAR(5), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
Declare v_EmployeeTypeId varchar(5);
Declare v_EmployeeType varchar(50);
Declare v_DeductionHeadId varchar(5) ; 
Declare v_EmployeeTypeGroup varchar(10);
Start Transaction; 

If pIUFlag='U'
	Then
		   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   		Select EmployeeTypeId Into v_EmployeeTypeId from MEmployee  Where    EmployeeId=pEmployeeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Select DeductionHeadID Into v_DeductionHeadId from MDeductionHeads  Where DeductionHead=pDeductionHead  and CompanyId =pCompanyId and BranchId =pBranchId;

	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select EmployeeTypeGroup Into v_EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId=v_EmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	      
		  

	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select ShortName Into v_EmployeeType from MEmployeeType  Where    EmployeeTypeId=v_EmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   
		--  SQLINES DEMO *** *) from MCaderwiseDeduction Where CaderwiseDeductionId=@CaderwiseDeductionId   and CompanyId =@CompanyId and BranchId=@BranchId
		-- if @Cnt > 0 
		-- Begin
		-- SQLINES DEMO *** 'EarningHeads Record  Already Exist !!'
		-- SQLINES DEMO *** 00'
		-- SQLINES DEMO *** ion
		--	return
		-- End

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Insert into MEmployeewiseDeduction (CompanyId ,BranchId,EmployeeId,EmployeewiseDeductionId,EmployeeTypeId, EmployeewiseDeductionDate,EmployeeType ,EmployeeTypeGroup, DeductionHeadId,DeductionHead ,DCalculationType ,DCalculationValue, Formula, Remark,AcFlag,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn) values
				(pCompanyId,pBranchId,pEmployeeId,pEmployeewiseDeductionId,v_EmployeeTypeId,str_to_date(now(3),103),v_EmployeeType,v_EmployeeTypeGroup ,v_DeductionHeadId ,pDeductionHead ,pDCalculationType ,pDCalculationValue,pFormula, pRemark ,pAcFlag ,pCreatedBy ,str_to_date(now(3),103) ,pModifiedBy,str_to_date(now(3),103));  
		
		--  SQLINES DEMO *** rningHeads Record  Inserted Successfully !!'
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='401';
		Commit;
		leave splbl;		
	-- Else If @IUFlag='U'
	-- Begin

	-- SQLINES DEMO *** eTypeGroup=EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId
	-- SQLINES DEMO *** eType=EmployeeType from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId

	-- SQLINES DEMO *** (*) from MCaderwiseDeduction Where  CaderwiseDeductionId <> @CaderwiseDeductionId and CompanyId =@CompanyId and BranchId=@BranchId
	--	if @Cnt > 0 
	--	Begin
	-- SQLINES DEMO *** ='EarningHeads Record Already Exist !!'
	-- SQLINES DEMO *** '400'
	-- SQLINES DEMO *** tion
	--		return
	--	End
	--  SQLINES DEMO *** wiseDeduction (CompanyId ,BranchId,CaderwiseDeductionId,EmployeeTypeId, MappingDate,EmployeeType ,EmployeeTypeGroup, DeductionHeadId,DeductionHead ,CalculationType ,CalculationValue,Remark,AcFlag,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn) values
	-- SQLINES DEMO *** anchId,@CaderwiseDeductionId,@EmployeeTypeId,convert(datetime,getdate(),103),@EmployeeType,@EmployeeTypeGroup ,@DeductionHeadId ,@DeductionHead ,@CalculationType ,@CalculationValue, @Remark ,@AcFlag ,@CreatedBy ,convert(datetime,getdate(),103) ,@ModifiedBy,convert(datetime,getdate(),103))  
	-- SQLINES DEMO *** '402'
	-- SQLINES DEMO ***  ' EarningHeads Record  Updated Successfully !!'
	--	Commit Transaction
	--	return		
	-- End
	Elseif pIUFlag='D'
	Then
	  Update MEmployeewiseDeduction Set 
				
		AcFlag ='N'
		 Where EmployeewiseDeductionId=pEmployeewiseDeductionId and CompanyId =pCompanyId and BranchId=pBranchId;
		 	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	 		Set pResult='403';
		--  SQLINES DEMO *** EarningHeads Record Deleted Successfully !!'
		-- Commit Transaction
		leave splbl;		
	
End if;
END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeewiseEarning` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pEmployeeId` VARCHAR(7), `pEmployeewiseEarningId` VARCHAR(5), `pEmployeewiseEarningDate` DATETIME(3), `pEarningHead` VARCHAR(500), `pECalculationType` VARCHAR(10), `pECalculationValue` DECIMAL(10,2), `pFormula` VARCHAR(500), `pRemark` VARCHAR(1000), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(5), `pModifiedBy` VARCHAR(5), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
--  SQLINES DEMO *** rchar(7),
--  SQLINES DEMO *** varchar(50),
--  SQLINES DEMO ***  as varchar(10)
Declare v_EmployeeTypeId varchar(5);
Declare v_EmployeeType varchar(50);
Declare v_EarningHeadId varchar(5) ; 
Declare v_EmployeeTypeGroup varchar(10);

Start Transaction; 

If pIUFlag='U'
	Then
	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select EmployeeTypeId Into v_EmployeeTypeId from MEmployee  Where    EmployeeId=pEmployeeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Select EarningHeadId Into v_EarningHeadId from MEarningHeads  Where EarningHead=pEarningHead  and CompanyId =pCompanyId and BranchId =pBranchId;

	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select EmployeeTypeGroup Into v_EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId=v_EmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	        
   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   Select ShortName Into v_EmployeeType from MEmployeeType  Where    EmployeeTypeId=v_EmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Insert into MEmployeewiseEarning (CompanyId ,BranchId,EmployeeId,EmployeewiseEarningId,EmployeeTypeId, EmployeewiseEarningDate,EmployeeType ,EmployeeTypeGroup, EarningHeadId,EarningHead ,ECalculationType ,ECalculationValue,Formula,Remark,AcFlag,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn) values
				(pCompanyId,pBranchId,pEmployeeId,pEmployeewiseEarningId,v_EmployeeTypeId,str_to_date(now(3),103),v_EmployeeType,v_EmployeeTypeGroup ,v_EarningHeadId ,pEarningHead ,pECalculationType ,pECalculationValue,pFormula, pRemark ,pAcFlag ,pCreatedBy ,str_to_date(now(3),103) ,pModifiedBy,str_to_date(now(3),103));  
		
		--  SQLINES DEMO *** rningHeads Record  Inserted Successfully !!'
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='401';
		Commit;
		leave splbl;		
	-- Else If @IUFlag='U'
	-- Begin

	--  SQLINES DEMO *** peGroup=EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId
	-- SQLINES DEMO *** eType=EmployeeType from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId


	-- SQLINES DEMO *** (*) from MCaderwiseEarning Where  CaderwiseEarningId <> @CaderwiseEarningId and CompanyId =@CompanyId 
	--	if @Cnt > 0 
	--	Begin
	-- SQLINES DEMO *** ='EarningHeads Record Already Exist !!'
	-- SQLINES DEMO *** '400'
	-- SQLINES DEMO *** tion
	--		return
	--	End
	-- SQLINES DEMO *** rwiseEarning (CompanyId ,BranchId,CaderwiseEarningId,EmployeeTypeId, MappingDate,EmployeeType ,EmployeeTypeGroup, EarningHeadId,EarningHead ,CalculationType ,CalculationValue,Remark,AcFlag,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn) values
	-- SQLINES DEMO *** anchId,@CaderwiseEarningId,@EmployeeTypeId,convert(datetime,getdate(),103),@EmployeeType,@EmployeeTypeGroup ,@EarningHeadId ,@EarningHead ,@CalculationType ,@CalculationValue, @Remark ,@AcFlag ,@CreatedBy ,convert(datetime,getdate(),103) ,@ModifiedBy,convert(datetime,getdate(),103))  
		
	-- SQLINES DEMO *** '402'
	-- SQLINES DEMO ***  ' EarningHeads Record  Updated Successfully !!'
	--	Commit Transaction
	--	return		
	-- End
	Elseif pIUFlag='D'
	Then 
	  Update MEmployeewiseEarning Set 
				
		AcFlag ='N'
		 Where EmployeewiseEarningId=pEmployeewiseEarningId and CompanyId =pCompanyId and BranchId=pBranchId;
		 	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	 		Set pResult='403';
		--  SQLINES DEMO *** EarningHeads Record Deleted Successfully !!'
		-- Commit Transaction
		leave splbl;		
	
End if;
	













END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMEmployeeWorkProfile` (IN `pCompanyId` VARCHAR(5), IN `pBranchId` VARCHAR(5), IN `pEmployeeId` INT, IN `pDOJ` VARCHAR(50), IN `pDOL` VARCHAR(50), IN `pContractorId` VARCHAR(50), IN `pDeptGroupId` VARCHAR(50), IN `pDeptId` VARCHAR(50), IN `pSubDeptId` VARCHAR(50), IN `pDesgId` VARCHAR(50), IN `pReportingTo` VARCHAR(50), IN `pWeeklyOff` VARCHAR(50), IN `pShiftId` VARCHAR(50), IN `pBandId` VARCHAR(50), IN `pZoneId` VARCHAR(50), IN `pGradeId` VARCHAR(50), IN `pCostCenterId` VARCHAR(50), IN `pBondApplicable` VARCHAR(1), IN `pBondAttachment` VARCHAR(500), IN `pCurrentJob` VARCHAR(500), IN `pRemark` VARCHAR(100), IN `pAcFlag` VARCHAR(1), IN `pCreatedBy` VARCHAR(50), IN `pCreatedOn` VARCHAR(50), IN `pModifiedBy` VARCHAR(50), IN `pModifiedOn` VARCHAR(50), IN `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
    DECLARE v_Err INT;
    DECLARE v_Cnt INT;

    START TRANSACTION;

    IF pIUFlag = 'I' THEN
        -- Insert logic
        INSERT INTO MEmployeeWorkProfile (
            CompanyId, BranchId, EmployeeId, DOJ, DOL, ContractorId, DeptGroupId,
            DeptId, SubDeptId, DesgId, ReportingTo, WeeklyOff, ShiftId, BandId,
            ZoneId, GradeId, CostCenterId, BondApplicable, BondAttachment, CurrentJob,
            Remark, AcFlag, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn
        )
        VALUES (
            pCompanyId, pBranchId, pEmployeeId, pDOJ, pDOL, pContractorId, pDeptGroupId,
            pDeptId, pSubDeptId, pDesgId, pReportingTo, pWeeklyOff, pShiftId, pBandId,
            pZoneId, pGradeId, pCostCenterId, pBondApplicable, pBondAttachment, pCurrentJob,
            pRemark, pAcFlag, pCreatedBy, pCreatedOn, pModifiedBy, pModifiedOn
        );

        SET pResult = '401'; -- Success code for insert

    ELSEIF pIUFlag = 'U' THEN
        -- Update logic
        UPDATE MEmployeeWorkProfile
        SET
            DOJ = pDOJ,
            DOL = pDOL,
            ContractorId = pContractorId,
            DeptGroupId = pDeptGroupId,
            DeptId = pDeptId,
            SubDeptId = pSubDeptId,
            DesgId = pDesgId,
            ReportingTo = pReportingTo,
            WeeklyOff = pWeeklyOff,
            ShiftId = pShiftId,
            BandId = pBandId,
            ZoneId = pZoneId,
            GradeId = pGradeId,
            CostCenterId = pCostCenterId,
            BondApplicable = pBondApplicable,
            BondAttachment = pBondAttachment,
            CurrentJob = pCurrentJob,
            Remark = pRemark,
            AcFlag = pAcFlag,
            ModifiedBy = pModifiedBy,
            ModifiedOn = pModifiedOn
        WHERE
            EmployeeId = pEmployeeId AND
            CompanyId = pCompanyId AND
            BranchId = pBranchId;

        SET pResult = '402'; -- Success code for update

    ELSEIF pIUFlag = 'D' THEN
        -- Delete logic
        UPDATE MEmployeeWorkProfile
        SET AcFlag = 'N'
        WHERE EmployeeId = pEmployeeId AND CompanyId = pCompanyId AND BranchId = pBranchId;

        SET pResult = '403'; -- Success code for delete
    END IF;

    COMMIT;
    LEAVE splbl;

END$$

$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMHoliday` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pFYear` VARCHAR(5), `pHolidayId` VARCHAR(5), `pHolidayDate` DATETIME(3), `pHolidayDescription` VARCHAR(500), `pHolidayType` VARCHAR(3), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pRemark` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
  
	If pIUFlag='I'
	Then
		--  SQLINES DEMO *** *) from MHoliday Where  HolidayType =@HolidayType and CompanyId =@CompanyId and BranchId =@BranchId
		-- if @Cnt > 0 
		-- Begin
		-- SQLINES DEMO *** 'Holiday Record is  Already Exist !!'
		-- SQLINES DEMO *** 00'
		-- SQLINES DEMO *** ion
		--	return
		-- End
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Insert into MHoliday (CompanyId , BranchId ,FYear ,HolidayId , HolidayDate ,HolidayDescription ,HolidayType ,AcFlag ,CreatedBy ,CreatedOn ,ModifiedBy,ModifiedOn ,Remark  ) values
				(pCompanyId , pBranchId ,pFYear ,pHolidayId ,pHolidayDate,pHolidayDescription ,pHolidayType , pAcFlag ,pCreatedBy ,str_to_date(now(3),103) ,pModifiedBy,str_to_date(now(3),103) ,pRemark );  
		--  SQLINES DEMO *** liday  Record Inserted Successfully !!'
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='401';
	
		leave splbl;		


	Elseif pIUFlag='U'
	Then
		--  SQLINES DEMO *** *) from MHoliday Where  HolidayType =@HolidayType and  HolidayId<> @HolidayId  and CompanyId =@CompanyId  and BranchId =@BranchId
		-- if @Cnt > 0 
		-- Begin
		--  SQLINES DEMO *** 'Holiday Record is Already Exist !!'
		-- SQLINES DEMO *** 400'
		-- SQLINES DEMO *** ion
		--	return
		-- End


		Update MHoliday Set 
		
		
		Fyear=pFYear,
	HolidayDate =pHolidayDate ,
		HolidayDescription =pHolidayDescription ,
		HolidayType =pHolidayType ,
		AcFlag =pAcFlag ,
	    ModifiedBy =pModifiedBy,
		CreatedOn =str_to_date(now(3),103) ,
		 Remark=pRemark 
		 Where HolidayId=pHolidayId and CompanyId =pCompanyId and BranchId =pBranchId;
		 	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	 		Set pResult='402';
		--  SQLINES DEMO *** Holiday Record Updated Successfully !!'
		-- Commit Transaction
		leave splbl;		
	Elseif pIUFlag='D'
	Then
	  Update MHoliday Set 
		
		
		AcFlag ='N'
		 Where HolidayId=pHolidayId and CompanyId =pCompanyId and BranchId =BranchId;
		 	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	 		Set pResult='403';
		--  SQLINES DEMO *** Holiday Record Deleted Successfully !!'
		-- Commit Transaction
		leave splbl;		
	
	End if;



END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMJobsResponsibility` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pJobsResponsibilityId` VARCHAR(5), `pJobsResponsibilityName` VARCHAR(500), `pDuration` INT, `pPoints` INT, `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MJobsResponsibility Where   JobsResponsibilityName=pJobsResponsibilityName   and CompanyId =pCompanyId  and  BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** stination Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MJobsResponsibility (CompanyId,BranchId,JobsResponsibilityId, JobsResponsibilityName,Duration,Points, Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pJobsResponsibilityId, pJobsResponsibilityName,pDuration,pPoints,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				--  SQLINES DEMO *** stination NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MJobsResponsibility Where JobsResponsibilityName=pJobsResponsibilityName and JobsResponsibilityId <> pJobsResponsibilityId and CompanyId=pCompanyId and  BranchId=pBranchId;
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** stination Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MJobsResponsibility  SET 
	JobsResponsibilityName= pJobsResponsibilityName,Duration=pDuration,Points=pPoints,Remark=pRemark, AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where JobsResponsibilityId=pJobsResponsibilityId and CompanyId=pCompanyId and  BranchId=pBranchId;
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Destination Record Updated Successfully !!'
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MJobsResponsibility Set
	  AcFlag='N'
	  Where JobsResponsibilityId = pJobsResponsibilityId and CompanyId = pCompanyId and  BranchId=pBranchId;
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** Destination Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;










END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMJobType` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pJobTypeId` VARCHAR(5), `pJobTypeName` VARCHAR(50), `pShortName` VARCHAR(2), `pRateGroup` VARCHAR(3), `pRatePerDay` DECIMAL(18,2), `pCategory` VARCHAR(20), `pPosition` INT, `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MJobType Where   JobTypeName=pJobTypeName   and CompanyId =pCompanyId   and  BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** stination Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MJobType (CompanyId,BranchId,JobTypeId, JobTypeName,ShortName,RateGroup,RatePerDay,Category,Position, Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pJobTypeId, pJobTypeName,pShortName,pRateGroup,pRatePerDay,pCategory,pPosition,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				--  SQLINES DEMO *** stination NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MJobType Where JobTypeName=pJobTypeName and JobTypeId <> pJobTypeId and CompanyId=pCompanyId  and  BranchId=pBranchId;
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** stination Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MJobType  SET 
	JobTypeName=pJobTypeName,
	ShortName=pShortName,
	RateGroup=pRateGroup,
	RatePerDay=pRatePerDay,
	Category=pCategory,
	Position=pPosition,
	Remark=pRemark,
	AcFlag = pAcFlag,
	ModifiedBy = pModifiedBy,
	ModifiedOn =str_to_date(now(3),103)

      Where JobTypeId=pJobTypeId and CompanyId=pCompanyId  and  BranchId=pBranchId;
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Destination Record Updated Successfully !!'
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MJobType Set
	  AcFlag='N'
	  Where JobTypeId = pJobTypeId and CompanyId = pCompanyId  and  BranchId=pBranchId;
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** Destination Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;












END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMKRA` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pKRAId` VARCHAR(5), `pKRAName` VARCHAR(500), `pDuration` INT, `pPoints` INT, `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MKRA Where   KRAName=pKRAName   and CompanyId =pCompanyId   and  BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** stination Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MKRA (CompanyId,BranchId,KRAId, KRAName,Duration,Points, Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pKRAId, pKRAName,pDuration,pPoints,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				--  SQLINES DEMO *** stination NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MKRA Where KRAName=pKRAName and KRAId <> pKRAId and CompanyId=pCompanyId  and  BranchId=pBranchId;
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** stination Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MKRA  SET 
	KRAName= pKRAName,Duration=pDuration,Points=pPoints,Remark=pRemark, AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where KRAId=pKRAId and CompanyId=pCompanyId  and  BranchId=pBranchId;
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Destination Record Updated Successfully !!'
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MKRA Set
	  AcFlag='N'
	  Where KRAId = pKRAId and CompanyId = pCompanyId  and  BranchId=pBranchId;
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** Destination Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;











END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMLeaves` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pLeaveBalanceId` VARCHAR(5), `pFYear` VARCHAR(5), `pEmployeeId` VARCHAR(5), `pEmployeeTypeId` VARCHAR(5), `pMonth` VARCHAR(5), `pYear` VARCHAR(5), `pLeaveBalanceDate` DATETIME(3), `pEmployeeName` VARCHAR(500), `pLeaveTypeDesc` VARCHAR(5), `pOpeningBalance` VARCHAR(5), `pLeaveEarned1` DECIMAL(10,2), `pLeaveEarned2` DECIMAL(10,2), `pLeaveEarned3` DECIMAL(10,2), `pLeaveEarned4` DECIMAL(10,2), `pLeaveEarned5` DECIMAL(10,2), `pLeaveEarned6` DECIMAL(10,2), `pLeaveEarned7` DECIMAL(10,2), `pLeaveEarned8` DECIMAL(10,2), `pLeaveEarned9` DECIMAL(10,2), `pLeaveEarned10` DECIMAL(10,2), `pLeaveEarned11` DECIMAL(10,2), `pLeaveEarned12` DECIMAL(10,2), `pSanctionLeaveDays` DECIMAL(10,2), `pLeaveBalance` DECIMAL(10,2), `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
Declare v_EmployeeType varchar(10);
Declare v_EmployeeTypeGroup varchar(10);
Declare v_LeaveTypeId varchar(5);

Start Transaction; 
	
  
	If pIUFlag='I'
	Then

		   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   		Select ShortName,EmployeeTypeGroup Into v_EmployeeType, v_EmployeeTypeGroup from MEmployeeType  Where  EmployeeTypeId = pEmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;

		    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    		Select LeaveTypeId Into v_LeaveTypeId from MLeaveType  Where  ShortName=pLeaveTypeDesc  and CompanyId =pCompanyId and BranchId =pBranchId;



	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MLeaves Where    LeaveBalanceId= pLeaveBalanceId and BranchId=pBranchId  and CompanyId =pCompanyId; 
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** stination Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MLeaves (CompanyId,BranchId,LeaveBalanceId,FYear,EmployeeId,EmployeeTypeId,EmployeeType,EmployeeTypeGroup,Month,Year,LeaveBalanceDate,EmployeeName,LeaveTypeDesc,LeaveTypeId,OpeningBalance,LeaveEarned1,LeaveEarned2,LeaveEarned3,LeaveEarned4,LeaveEarned5,LeaveEarned6,LeaveEarned7,LeaveEarned8,LeaveEarned9,LeaveEarned10,LeaveEarned11,LeaveEarned12,SanctionLeaveDays,LeaveBalance,Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pLeaveBalanceId,pFYear,pEmployeeId,pEmployeeTypeId,v_EmployeeType,v_EmployeeTypeGroup,pMonth,pYear,pLeaveBalanceDate,pEmployeeName,pLeaveTypeDesc,v_LeaveTypeId,pOpeningBalance,pLeaveEarned1,pLeaveEarned2,pLeaveEarned3,pLeaveEarned4,pLeaveEarned5,pLeaveEarned6,pLeaveEarned7,pLeaveEarned8,pLeaveEarned9,pLeaveEarned10,pLeaveEarned11,pLeaveEarned12,pSanctionLeaveDays,pLeaveBalance,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				--  SQLINES DEMO *** stination NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MLeaves Where  LeaveBalanceId= pLeaveBalanceId and BranchId=pBranchId  and LeaveBalanceId <> pLeaveBalanceId and CompanyId =pCompanyId; 
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** stination Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MLeaves  SET 
	LeaveBalanceId= pLeaveBalanceId, Remark=pRemark, AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where  LeaveBalanceId=pLeaveBalanceId and CompanyId=pCompanyId  and  BranchId=pBranchId;
      
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Destination Record Updated Successfully !!'
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MLeaves Set
	  AcFlag='N'
	  Where LeaveBalanceId = pLeaveBalanceId and CompanyId = pCompanyId  and  BranchId=pBranchId;
      
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** Destination Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;






END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMLeaveType` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pLeaveTypeId` VARCHAR(5), `pLeaveType` VARCHAR(500), `pShortName` VARCHAR(2), `pPaidFlag` VARCHAR(10), `pCarryForwardFlag` VARCHAR(10), `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from MLeaveType Where  LeaveType =pLeaveType and CompanyId =pCompanyId and BranchId = pBranchId;
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** ployeeType  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		
	
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Insert into MLeaveType (CompanyId,BranchId ,LeaveTypeId ,LeaveType ,ShortName ,PaidFlag,CarryForwardFlag  ,Remark ,AcFlag   ,CreatedBy ,CreatedOn ,ModifiedBy ,ModifiedOn ) values
				(pCompanyId ,pBranchId ,pLeaveTypeId,pLeaveType ,pShortName,pPaidFlag,pCarryForwardFlag,pRemark ,pAcFlag,pCreatedBy ,str_to_date(now(3),103) ,pModifiedBy,str_to_date(now(3),103)  );  
		
		--  SQLINES DEMO *** ployeeType  Record Inserted Successfully !!'
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='401';
		Commit;
		leave splbl;		
	Elseif pIUFlag='U'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from MLeaveType Where LeaveType=pLeaveType and LeaveTypeId<> pLeaveTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
		if v_Cnt > 0 
		Then
		-- SQLINES DEMO *** LeaveType Already Exist !!'
				-- SQLINES LICENSE FOR EVALUATION USE ONLY
				Set pResult='400';
			Rollback;
			leave splbl;
		End if;


		Update MLeaveType Set 
		
		LeaveType=pLeaveType,
		ShortName=pShortName,
		PaidFlag=pPaidFlag,
		CarryForwardFlag=pCarryForwardFlag,
		Remark= pRemark,
		AcFlag =pAcFlag ,
		ModifiedBy =pModifiedBy,
	    ModifiedOn =str_to_date(now(3),103)
		 Where LeavetypeId=pLeaveTypeId and CompanyId =pCompanyId and BranchId =pBranchId;
		 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 		Set pResult='402';
		--  SQLINES DEMO *** EmployeeType Record Updated Successfully !!'
		Commit;
		leave splbl;		
	Elseif pIUFlag='D'
	Then
	  Update MLeaveType Set 
		
		
		AcFlag ='N'
		 Where LeaveTypeId=pLeaveTypeId and CompanyId =pCompanyId and BranchId =pBranchId;
		 	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	 		Set pResult='403';
		--  SQLINES DEMO *** EmployeeType Record Deleted Successfully !!'
		Commit;
		leave splbl;		

	End if;









END$$

$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMShift` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pShiftId` VARCHAR(5), `pEmployeeTypeId` VARCHAR(5), `pShiftName` VARCHAR(100), `pStartTime` DATETIME(3), `pEndTime` DATETIME(3), `pOTStartTime` DATETIME(3), `pGraceEarlyTime` INT, `pGraceLateTime` INT, `pHalfdayHours` DECIMAL(10,2), `pFulldayHours` DECIMAL(10,2), `pAutoRotateFlag` VARCHAR(1), `pTwoDayShift` VARCHAR(1), `pShiftGraceHoursMin` INT, `pShiftGraceHoursMax` INT, `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
--  SQLINES DEMO ***  as varchar(50),
Declare v_EmployeeTypeGroupId varchar(5) ;
 Declare v_EmployeeType  varchar(50); 

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
	
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	select ShortName,EmployeeTypeGroupId into v_EmployeeType, v_EmployeeTypeGroupId from VMEmployeeType where EmployeeTypeId =pEmployeeTypeId and CompanyId =pCompanyId and BranchId =pBranchId;
	
		   --  SQLINES DEMO *** peGroupId=EmployeeTypeGroupId from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Select ShortName Into v_EmployeeType from MEmployeeType  Where    EmployeeTypeId=pEmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	-- SQLINES DEMO *** ypeGroupId=FieldId from MTwoField where FieldDetails=@EmployeeTypeGroup and CompanyId=@CompanyId and BranchId=@BranchId

	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MShift Where   ShiftName=pShiftName  and CompanyId =pCompanyId and BranchId =pBranchId;
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** ployee Name  Already Exist !!
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MShift(CompanyId,BranchId,ShiftId,EmployeeTypeGroupId,EmployeeTypeId,ShiftName,StartTime,EndTime,OTStartTime,GraceEarlyTime,GraceLateTime,HalfdayHours,FulldayHours,AutoRotateFlag,TwoDayShift,ShiftGraceHoursMin,ShiftGraceHoursMax,Remark ,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pShiftId,v_EmployeeTypeGroupId,pEmployeeTypeId,pShiftName,pStartTime,pEndTime,pOTStartTime,pGraceEarlyTime,pGraceLateTime,pHalfdayHours,pFulldayHours,pAutoRotateFlag,pTwoDayShift,pShiftGraceHoursMin,pShiftGraceHoursMax,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				--  SQLINES DEMO *** ployee NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  

 --  SQLINES DEMO *** peGroupId=EmployeeTypeGroup from MEmployeeType  Where   EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId
	   --  SQLINES DEMO *** pe=ShortName from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId

  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MShift Where ShiftName=pShiftName   and ShiftId <> pShiftId  and CompanyId=pCompanyId and BranchId =pBranchId;

	if v_Cnt > 0
	Then
	
	--  SQLINES DEMO *** ployee Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MShift  SET 
	
	  --  SQLINES DEMO *** d=@EmployeeTypeGroupId,
	  EmployeeTypeId=pEmployeeTypeId,
	 -- SQLINES DEMO *** loyeeType,
	
	  ShiftName=pShiftName,
	  StartTime=pStartTime,
	  EndTime=pEndTime,
	  OTStartTime=pOTStartTime,
	  GraceEarlyTime=pGraceEarlyTime,
	  GraceLateTime=pGraceLateTime,
	  HalfdayHours=pHalfdayHours,
	  FulldayHours=pFulldayHours,
	  AutoRotateFlag=pAutoRotateFlag,
	  TwoDayShift=pTwoDayShift,
	  ShiftGraceHoursMin=pShiftGraceHoursMin,
	  ShiftGraceHoursMax=pShiftGraceHoursMax,
	  Remark=pRemark,
	 AcFlag = pAcFlag,
	 ModifiedBy = pModifiedBy, 
	 ModifiedOn =str_to_date(now(3),103)


      Where ShiftId=pShiftId and CompanyId=pCompanyId and BranchId =pBranchId;       --  SQLINES DEMO *** oupId=@EmployeeTypeGroupId 
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Employee Record Updated Successfully !!'
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MShift Set
	  AcFlag='N'
	  Where ShiftId =pShiftId  and CompanyId=pCompanyId and BranchId =pBranchId; --  SQLINES DEMO *** oupId=@EmployeeTypeGroupId
	  	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	  	Set pResult='403';
	  --  SQLINES DEMO *** Employee Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;






















END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMTwoField` (`pCompanyId` VARCHAR(5), `pFieldId` VARCHAR(5), `pBranchId` VARCHAR(5), `pMasterNameId` VARCHAR(5), `pFieldDetails` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pRemark` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
begin
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from MTwoField Where  FieldDetails =pFieldDetails  and  MasterNameId =pMasterNameId    and CompanyId =pCompanyId and BranchId=pBranchId;
		if v_Cnt > 0 
		Then
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='Record Already Exist !!';
			Rollback;
			leave splbl;
		End if;

		
	
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Insert into MTwoField (CompanyId ,FieldId ,BranchId, MasterNameId ,FieldDetails,AcFlag ,Remark,CreatedBy ,CreatedOn ,ModifiedBy,ModifiedOn) values
				(pCompanyId ,pFieldId ,pBranchId,pMasterNameId ,pFieldDetails,pAcFlag , pRemark ,pCreatedBy ,str_to_date(now(3),103) ,pModifiedBy,str_to_date(now(3),103));  
		
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult='Record Inserted Successfully !!';
		Commit;
		leave splbl;		
	Elseif pIUFlag='U'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from MTwoField Where FieldId <> pFieldId and FieldDetails =pFieldDetails and  MasterNameId =pMasterNameId    and CompanyId =pCompanyId  and BranchId=pBranchId;


		if v_Cnt > 0 
		Then
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='Record Already Exist !!';
			Rollback;
			leave splbl;
		End if;


		Update MTwoField Set 
		
		 MasterNameId =pMasterNameId,
		 FieldDetails=pFieldDetails,AcFlag =pAcFlag , Remark = pRemark, ModifiedBy =pModifiedBy,ModifiedOn =str_to_date(now(3),103)
		 Where FieldId=pFieldId  and CompanyId =pCompanyId and BranchId=pBranchId;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult= 'Record Updated Successfully !!';
		Commit;
		leave splbl;		
	Elseif pIUFlag='D'
	Then
	  Update MTwoField Set 
		
		
		AcFlag ='N'
		 Where FieldId=pFieldId  and CompanyId =pCompanyId and BranchId=pBranchId;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Set pResult= 'Record Deleted Successfully !!';
		Commit;
		leave splbl;		
	
	End if;
END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspMWeeklyOff` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pWeeklyOffId` VARCHAR(5), `pWeeklyOffName` VARCHAR(500), `pRemark` VARCHAR(500), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;

Start Transaction; 
	
  
	If pIUFlag='I'
	Then
	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from MWeeklyOff Where   WeeklyOffName=pWeeklyOffName   and  BranchId=pBranchId and CompanyId =pCompanyId; 
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** ntractor Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;

		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO MWeeklyOff(CompanyId,BranchId,WeeklyOffId,WeeklyOffName,Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pWeeklyOffId,pWeeklyOffName,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));

				--  SQLINES DEMO *** ntractor NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from MWeeklyOff Where WeeklyOffName=pWeeklyOffName and BranchId=pBranchId and WeeklyOffId <> pWeeklyOffId and CompanyId=pCompanyId; 
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** ntractor Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
	  Rollback;
	  leave splbl;
    End if;

	 UPDATE MWeeklyOff  SET
	  
	WeeklyOffName=pWeeklyOffName,Remark=pRemark,AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where WeeklyOffId=pWeeklyOffId and CompanyId=pCompanyId  and BranchId=pBranchId;
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Contractor Record Updated Successfully !!'
		Commit;
		leave splbl;		

	Elseif pIUFlag='D'
	Then
	Update MWeeklyOff Set
	  AcFlag='N'
	  Where  WeeklyOffId=pWeeklyOffId and CompanyId = pCompanyId  and BranchId=pBranchId;
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** WeeklyOff  Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;












END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspTAdvanceRequest` (`pCompanyId` INT, `pBranchId` INT, `pAdvanceId` INT, `pAdvanceDate` DATETIME(3), `pEmployeeId` VARCHAR(5), `pFYear` VARCHAR(5), `pAdvanceType` VARCHAR(10), `pAmount` DECIMAL(18,2), `pInstallment` INT, `pPurpose` VARCHAR(100), `pProjectId` VARCHAR(5), `pAdvanceStatus` VARCHAR(50), `pAMonth` VARCHAR(2), `pAYear` VARCHAR(5), `pApprovalFlag` VARCHAR(1), `pApprovedAmount` DECIMAL(18,2), `pApprovedInstallments` INT, `pRemark` VARCHAR(1000), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), `pApprovedBy` VARCHAR(500), `pRejectedBy` VARCHAR(500), `pRejectReason` VARCHAR(1000), OUT `pResult` VARCHAR(100))   splbl:

BEGIN
  DECLARE v_Err INT;
  DECLARE v_Cnt INT;

  START TRANSACTION;

  IF pIUFlag = 'I'
  THEN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    SELECT COUNT(*) INTO v_Cnt FROM TAdvanceRequest WHERE AdvanceId = pAdvanceId AND BranchId = pBranchId AND CompanyId = pCompanyId;

    IF v_Cnt > 0
    THEN
      SET pResult = '400';
      ROLLBACK;
      LEAVE splbl;
    END IF;

    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO TAdvanceRequest (CompanyId,
                                BranchId,
                                AdvanceId,
                                AdvanceDate,
                                EmployeeId,
                                FYear,
                                AdvanceType,
                                Amount,
                                Installment,
                                Purpose,
                                ProjectId,
                                AdvanceStatus,
                                AMonth,
                                AYear,
                                ApprovedAmount,
                                ApprovedInstallments,
                                ApprovalFlag,
                                Remark,
                                AcFlag,
                                CreatedBy,
                                CreatedOn,
                                ModifiedBy,
                                ModifiedOn,
                                ApprovedBy,
                                RejectedBy,
                                RejectReason)
    VALUES (pCompanyId,
            pBranchId,
            pAdvanceId,
            pAdvanceDate,
            pEmployeeId,
            pFYear,
            pAdvanceType,
            pAmount,
            pInstallment,
            pPurpose,
            pProjectId,
            pAdvanceStatus,
            pAMonth,
            pAYear,
            pApprovedAmount,
            pApprovedInstallments,
            pApprovalFlag,
            pRemark,
            pAcFlag,
            pCreatedBy,
            NOW(3),
            pModifiedBy,
            NOW(3),
            pApprovedBy,
            pRejectedBy,
            pRejectReason);

    SET pResult = '401';
    COMMIT;
    LEAVE splbl;
  ELSEIF pIUFlag = 'U'
  THEN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    SELECT COUNT(*) INTO v_Cnt FROM TAdvanceRequest WHERE AdvanceId = pAdvanceId AND BranchId = pBranchId AND AdvanceId <> pAdvanceId AND CompanyId = pCompanyId AND FYear = pFYear AND EmployeeId = pEmployeeId;

    IF v_Cnt > 0
    THEN
      SET pResult = '400';
      ROLLBACK;
      LEAVE splbl;
    END IF;

    UPDATE TAdvanceRequest
    SET EmployeeId = pEmployeeId,
        AdvanceId = pAdvanceId,
        AdvanceDate = pAdvanceDate,
        AdvanceType = pAdvanceType,
        Amount = pAmount,
        Installment = pInstallment,
        Purpose = pPurpose,
        ProjectId = pProjectId,
        AdvanceStatus = pAdvanceStatus,
        AMonth = pAMonth,
        AYear = pAYear,
        Remark = pRemark,
        AcFlag = pAcFlag,
        ModifiedBy = pModifiedBy,
        ModifiedOn = NOW(3),
        ApprovedBy = pApprovedBy,
        RejectedBy = pRejectedBy,
        RejectReason = pRejectReason
    WHERE AdvanceId = pAdvanceId AND CompanyId = pCompanyId AND BranchId = pBranchId;

    SET pResult = '402';
    COMMIT;
    LEAVE splbl;
  ELSEIF pIUFlag = 'D'
  THEN
    UPDATE TAdvanceRequest
    SET AcFlag = 'N'
    WHERE AdvanceId = pAdvanceId AND CompanyId = pCompanyId AND BranchId = pBranchId;

    SET pResult = '403';
    COMMIT;
    LEAVE splbl;
  END IF;
END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspTEmployeeGatepass` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pGatepassId` VARCHAR(20), `pGatepassDate` DATETIME(3), `pFYear` VARCHAR(4), `pEmployeeId` VARCHAR(5), `pInTime` DATETIME(3), `pOutTime` DATETIME(3), `pGatepassType` VARCHAR(1), `pPurpose` VARCHAR(1000), `pRejectReason` VARCHAR(1000), `pSanctionBy` VARCHAR(5), `pRemark` VARCHAR(1000), `pApprovalFlag` VARCHAR(1), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
Declare v_EmployeeTypeId varchar(5);
Declare v_EmployeeType  varchar(50);
Declare v_EmployeeTypeGroup varchar(5);

Start Transaction; 
	  
	If pIUFlag='I'
	Then

	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Select EmployeeTypeId Into v_EmployeeTypeId from MEmployee  Where    EmployeeId=pEmployeeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select ShortName,EmployeeTypeGroup Into v_EmployeeType, v_EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId = v_EmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;

	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from TEmployeeGatepass Where   GatepassId=pGatepassId and BranchId=pBranchId  and CompanyId =pCompanyId; 
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** stination Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;
																																
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO TEmployeeGatepass (CompanyId,BranchId,GatepassId,GatepassDate,FYear,EmployeeId,EmployeeType,EmployeeTypeGroup,InTime,OutTime,GatepassType,Purpose,RejectReason,SanctionBy,ApprovalFlag,Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pGatepassId,pGatepassDate,pFYear,pEmployeeId,v_EmployeeType,v_EmployeeTypeGroup,pInTime,pOutTime,pGatepassType,pPurpose,pRejectReason,pSanctionBy,pApprovalFlag,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));
																						
				--  SQLINES DEMO *** stination NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from TEmployeeGatepass Where  GatepassId=pGatepassId and BranchId=pBranchId and  GatepassId <> pGatepassId and CompanyId=pCompanyId and FYear= pFYear and EmployeeId=pEmployeeId;
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** stination Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
			Rollback;
			leave splbl;
    End if;

	 UPDATE TEmployeeGatepass  SET 
	GatepassId=pGatepassId,GatepassDate=pGatepassDate,InTime =pInTime,
	Remark=pRemark, AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where  GatepassId=pGatepassId and CompanyId=pCompanyId  and  BranchId=pBranchId;
      
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Destination Record Updated Successfully !!'
		Commit;
		leave splbl;		
	Elseif pIUFlag='D'
	Then
	Update TEmployeeGatepass Set
	  AcFlag='N'
	  Where GatepassId=pGatepassId and CompanyId = pCompanyId  and  BranchId=pBranchId;
      
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** Destination Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;
END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspTLeaves` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pLeaveApplicationId` VARCHAR(20), `pLeaveApplicationDate` DATETIME(3), `pFYear` VARCHAR(4), `pEmployeeId` VARCHAR(5), `pLeaveFromDate` DATETIME(3), `pLeaveToDate` DATETIME(3), `pLeaveTypeID` VARCHAR(5), `pLeaveDays` DECIMAL(10,2), `pSanctionBy` VARCHAR(5), `pSanctionFromDate` DATETIME(3), `pSanctionToDate` DATETIME(3), `pSanctionLeaveDays` DECIMAL(10,2), `pRemark` VARCHAR(1000), `pApprovalFlag` VARCHAR(1), `pAcFlag` VARCHAR(1), `pCreatedBy` VARCHAR(500), `pModifiedBy` VARCHAR(500), `pIUFlag` VARCHAR(1), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
Declare v_EmployeeTypeId varchar(5) ;
Declare v_EmployeeTypeGroup varchar(5) ;
Declare v_EmployeeType  varchar(50);

Start Transaction; 
	  
	If pIUFlag='I'
	Then

	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Select EmployeeTypeId Into v_EmployeeTypeId from MEmployee  Where    EmployeeId=pEmployeeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select ShortName,EmployeeTypeGroup Into v_EmployeeType, v_EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId = v_EmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;


	      -- SQLINES LICENSE FOR EVALUATION USE ONLY
      	Select Count(*) Into v_Cnt from TLeaves Where   LeaveApplicationId=pLeaveApplicationId and BranchId=pBranchId  and CompanyId =pCompanyId; 
		if v_Cnt > 0 
		Then
			--  SQLINES DEMO *** stination Name  Already Exist !!'
			-- SQLINES LICENSE FOR EVALUATION USE ONLY
			Set pResult='400';
			Rollback;
			leave splbl;
		End if;
																																
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		INSERT INTO TLeaves (CompanyId,BranchId,LeaveApplicationId,LeaveApplicationDate,FYear,EmployeeId,EmployeeType,EmployeeTypeGroup,LeaveFromDate,LeaveToDate,LeaveTypeID,LeaveDays,SanctionBy,SanctionFromDate,SanctionToDate,SanctionLeaveDays,ApprovalFlag,Remark,AcFlag,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn)
		        VALUES (pCompanyId,pBranchId,pLeaveApplicationId,pLeaveApplicationDate,pFYear,pEmployeeId,v_EmployeeType,v_EmployeeTypeGroup,pLeaveFromDate,pLeaveToDate,pLeaveTypeID,pLeaveDays,pSanctionBy,pSanctionFromDate,pSanctionToDate,pSanctionLeaveDays,pApprovalFlag,pRemark,pAcFlag,pCreatedBy,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103));
																						
				--  SQLINES DEMO *** stination NRecord Inserted Successfully!'
		  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  		Set pResult='401';
		  Commit;
		 Leave splbl;

 Elseif pIUFlag='U'
 
 Then
  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  Select Count(*) Into v_Cnt from TLeaves Where LeaveApplicationId=pLeaveApplicationId and BranchId=pBranchId and LeaveApplicationId <> pLeaveApplicationId and CompanyId=pCompanyId and FYear= pFYear and EmployeeId=pEmployeeId;
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** stination Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
			Rollback;
			leave splbl;
    End if;

	 UPDATE TLeaves  SET 
	LeaveApplicationId= pLeaveApplicationId,LeaveApplicationDate=pLeaveApplicationDate, LeaveFromDate=pLeaveFromDate,LeaveToDate=pLeaveToDate,LeaveTypeId=pLeaveTypeID,LeaveDays=pLeaveDays,
	Remark=pRemark, AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where  LeaveApplicationId=pLeaveApplicationId and CompanyId=pCompanyId  and  BranchId=pBranchId;
      
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		--  SQLINES DEMO *** Destination Record Updated Successfully !!'
		Commit;
		leave splbl;		
	Elseif pIUFlag='D'
	Then
	Update TLeaves Set
	  AcFlag='N'
	  Where LeaveApplicationId = pLeaveApplicationId and CompanyId = pCompanyId  and  BranchId=pBranchId;
      
	  -- SQLINES LICENSE FOR EVALUATION USE ONLY
  	Set pResult='403';
	  --  SQLINES DEMO *** Destination Record Deleted Successfully !!'
		Commit;
		leave splbl;		
	
	End if;























END$$

CREATE DEFINER=`u172510268_devs`@`127.0.0.1` PROCEDURE `UspTManualAttendance` (`pCompanyId` VARCHAR(5), `pBranchId` VARCHAR(5), `pAttendanceId` VARCHAR(5), `pEmployeeTypeId` VARCHAR(5), `pJobTypeId` VARCHAR(5), `pShiftId` VARCHAR(5), `pEmployeeId` VARCHAR(5), `pFYear` VARCHAR(5), `pAttendanceDate` DATETIME(3), `pInTime` DATETIME(3), `pOutTime` DATETIME(3), `pSanctionBy` VARCHAR(5), `pAttendanceFlag` VARCHAR(1), `pRemark` VARCHAR(500), `pApprovalFlag` VARCHAR(1), `pAcFlag` VARCHAR(1), `pIUFlag` VARCHAR(1), `pCreatedBy` VARCHAR(5), `pModifiedBy` VARCHAR(5), OUT `pResult` VARCHAR(100))   splbl:
BEGIN
Declare
v_Err int;
Declare v_Cnt int;
Declare v_EmployeeType varchar(50);
Declare v_EmployeeTypeGroup varchar(5);
Start Transaction; 
	


	If pIUFlag='I'

	Then
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Select EmployeeTypeId Into pEmployeeTypeId from MEmployee  Where    EmployeeId=pEmployeeId  and CompanyId =pCompanyId and BranchId =pBranchId;
	   -- SQLINES LICENSE FOR EVALUATION USE ONLY
   	Select ShortName,EmployeeTypeGroup Into v_EmployeeType, v_EmployeeTypeGroup from MEmployeeType  Where    EmployeeTypeId = pEmployeeTypeId  and CompanyId =pCompanyId and BranchId =pBranchId;

	--  SQLINES DEMO *** Type  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId
	  -- SQLINES DEMO *** ype=ShortName from MEmployeeType  Where    EmployeeTypeId=@EmployeeTypeId  and CompanyId =@CompanyId and BranchId =@BranchId 


	--  SQLINES DEMO ***  ,Date: 27/05/2017
	update TManualAttendance set AcFlag='N' where EmployeeId=pEmployeeId and FYear =pFYear and AttendanceDate=pAttendanceDate; 
	--  SQLINES DEMO ***  Yogesh ,Date: 27/05/2017
	
	
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Insert into TManualAttendance (CompanyId,BranchId,AttendanceId, EmployeeTypeId ,JobTypeId,ShiftId,EmployeeId,EmployeeTypeGroup,FYear,AttendanceDate, InTime,OutTime,SanctionBy,AttendanceFlag,ApprovalFlag,Remark,AcFlag ,CreatedBy ,CreatedOn,ModifiedBy,ModifiedOn ) 
			values	(pCompanyId,pBranchId,pAttendanceId, pEmployeeTypeId ,pJobTypeId,pShiftId,pEmployeeId,v_EmployeeTypeGroup,pFYear,pAttendanceDate ,pInTime,pOutTime,pSanctionBy,pAttendanceFlag,pApprovalFlag,pRemark,pAcFlag ,pCreatedBy ,str_to_date(now(3),103),pModifiedBy,str_to_date(now(3),103) );	
		
		--  SQLINES DEMO *** lAttandance (CompanyId,AttandanceId,EmployeeId ,MAttadanceDate, InTime,OutTime,Remark,AcFlag ,CreatedBy ,CreatedOn,AttendanceFlag,ShiftId,JobTypeId ) values
		-- SQLINES DEMO *** andanceId ,@EmployeeId ,@MAttadanceDate	,@InTime,@OutTime,@Remark,@AcFlag ,@CreatedBy ,convert(datetime,getdate(),103),@AttendanceFlag,@ShiftId,@JobTypeId  )	
		
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='Employee Attendance  Record Inserted Successfully !!';
		Commit;
		leave splbl;		
	Elseif pIUFlag='U'
	Then
		-- SQLINES LICENSE FOR EVALUATION USE ONLY
		Select Count(*) Into v_Cnt from TManualAttendance Where  AttendanceId=pAttendanceId and BranchId=pBranchId and  AttendanceId <> pAttendanceId and CompanyId=pCompanyId and FYear= pFYear and EmployeeId=pEmployeeId;
	if v_Cnt > 0
	Then
	--  SQLINES DEMO *** stination Already Exist !!'
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	Set pResult='400';
			Rollback;
			leave splbl;
    End if;

	 UPDATE TManualAttendance  SET 
	AttendanceId=pAttendanceId,AttendanceDate=pAttendanceDate,AttendanceFlag =pAttendanceFlag,ApprovalFlag =pApprovalFlag , SanctionBy=pSanctionBy ,InTime =pInTime,OutTime =pOutTime
	,Remark=pRemark, AcFlag = pAcFlag, ModifiedBy = pModifiedBy, ModifiedOn =str_to_date(now(3),103)
      Where  AttendanceId=pAttendanceId and CompanyId=pCompanyId  and  BranchId=pBranchId;
      
	
	 -- SQLINES LICENSE FOR EVALUATION USE ONLY
 	Set pResult='402';
		Commit;
		 
		leave splbl;		
	End if;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `CompanyConfigs`
--

CREATE TABLE `CompanyConfigs` (
  `id` int(11) NOT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `sessionTM` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `empID` varchar(255) DEFAULT NULL,
  `cmulti` varchar(255) DEFAULT NULL,
  `att` varchar(255) DEFAULT NULL,
  `aProcess` varchar(255) DEFAULT NULL,
  `atap` varchar(255) DEFAULT NULL,
  `shiftFlag` varchar(255) DEFAULT NULL,
  `jobApp` varchar(255) DEFAULT NULL,
  `holiday` varchar(255) DEFAULT NULL,
  `odFlag` varchar(255) DEFAULT NULL,
  `otFlag` varchar(255) DEFAULT NULL,
  `LAFlag` varchar(255) DEFAULT NULL,
  `otCalc` varchar(255) DEFAULT NULL,
  `esicSal` varchar(255) DEFAULT NULL,
  `pfSal` varchar(255) DEFAULT NULL,
  `gratuity` varchar(255) DEFAULT NULL,
  `mlwf1` varchar(255) DEFAULT NULL,
  `mlwf2` varchar(255) DEFAULT NULL,
  `salLock` varchar(255) DEFAULT NULL,
  `minWages` varchar(255) DEFAULT NULL,
  `remarks1` varchar(255) DEFAULT NULL,
  `salstat` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `smtpHost` varchar(255) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `smsUrl` varchar(255) DEFAULT NULL,
  `sms` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CompanyConfigs`
--

INSERT INTO `CompanyConfigs` (`id`, `currency`, `theme`, `date`, `sessionTM`, `remarks`, `status`, `empID`, `cmulti`, `att`, `aProcess`, `atap`, `shiftFlag`, `jobApp`, `holiday`, `odFlag`, `otFlag`, `LAFlag`, `otCalc`, `esicSal`, `pfSal`, `gratuity`, `mlwf1`, `mlwf2`, `salLock`, `minWages`, `remarks1`, `salstat`, `email`, `smtpHost`, `sender`, `username`, `password`, `message`, `smsUrl`, `sms`, `createdAt`, `updatedAt`) VALUES
(1, 'INR', 'August', '30/09/23', '125', 'remarks general', 'true', 'Yes', 'No', 'Daily', 'Manual', 'Yes', 'Yes', 'No', 'Give C-Off', 'No', 'Yes', 'Yes', '10', '10000', '15000', '5', 'March', 'June', '10', '15000', 'remarks payroll', 'true', 'Yes', 'host', 'SysTechsolutions@gmail.com', 'SysTech', 'password', 'Greetings', 'sms url', 'sms', '2023-09-30 07:01:18', '2023-10-26 09:15:32');

-- --------------------------------------------------------

--
-- Table structure for table `EDImports`
--

CREATE TABLE `EDImports` (
  `id` int(11) NOT NULL,
  `Month` varchar(255) DEFAULT NULL,
  `Year` varchar(255) DEFAULT NULL,
  `SalaryHeads` varchar(255) DEFAULT NULL,
  `File` blob DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MBanks`
--

CREATE TABLE `MBanks` (
  `CompanyId` int(11) NOT NULL DEFAULT 1,
  `BranchId` int(11) NOT NULL DEFAULT 1,
  `BankId` int(11) NOT NULL,
  `AccountType` varchar(50) DEFAULT NULL,
  `BankName` varchar(100) NOT NULL,
  `BranchName` varchar(100) NOT NULL,
  `BranchAddress` varchar(500) DEFAULT NULL,
  `RegisteredEmailId` varchar(100) DEFAULT NULL,
  `RegisteredContactNo` int(11) DEFAULT NULL,
  `Remark` varchar(60) DEFAULT NULL,
  `AccountNo` varchar(50) DEFAULT NULL,
  `CurrencyType` varchar(50) DEFAULT 'INR',
  `AuthorizedPersonCount` int(11) DEFAULT 1,
  `AuthorizedPerson1` varchar(50) DEFAULT NULL,
  `AuthorizedPerson2` varchar(50) DEFAULT NULL,
  `AuthorizedPerson3` varchar(50) DEFAULT NULL,
  `AuthorizedPersonRole1` varchar(50) DEFAULT NULL,
  `AuthorizedPersonRole2` varchar(500) DEFAULT NULL,
  `AuthorizedPersonRole3` varchar(500) DEFAULT NULL,
  `IFSCCode` varchar(50) DEFAULT NULL,
  `SwiftCode` varchar(50) DEFAULT NULL,
  `BankGST` varchar(50) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MBanks`
--

INSERT INTO `MBanks` (`CompanyId`, `BranchId`, `BankId`, `AccountType`, `BankName`, `BranchName`, `BranchAddress`, `RegisteredEmailId`, `RegisteredContactNo`, `Remark`, `AccountNo`, `CurrencyType`, `AuthorizedPersonCount`, `AuthorizedPerson1`, `AuthorizedPerson2`, `AuthorizedPerson3`, `AuthorizedPersonRole1`, `AuthorizedPersonRole2`, `AuthorizedPersonRole3`, `IFSCCode`, `SwiftCode`, `BankGST`, `AcFlag`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Savings', 'Bank of Mahrashtra', 'Andheri', 'Mumbai', '123@qwe', 98198371, 'text', '123123123', '', 3, 'matt', 'd', 'df', 'View', 'View', 'Operation', '123123', '123132', '2133123', 'Y', '2023-12-01 04:42:04', '2023-12-01 05:32:58'),
(1, 1, 2, 'Cash Credit', 'SBI', 'pune', 'pune', 'snflwnd', 97655675, 'text', '9090909', '', 2, 'abcd', 'rfe', 'reweq', 'View', 'Operation', 'View', '878787', 'lndfnd', '88888', 'Y', '2023-12-01 04:45:53', '2023-12-01 04:45:53');

-- --------------------------------------------------------

--
-- Table structure for table `MCaderwiseDeductions`
--

CREATE TABLE `MCaderwiseDeductions` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `CaderwiseDeductionId` varchar(5) NOT NULL,
  `CaderwiseDeductionDate` datetime DEFAULT NULL,
  `EmployeeTypeId` varchar(5) NOT NULL,
  `EmployeeType` varchar(50) NOT NULL,
  `EmployeeTypeGroup` varchar(10) DEFAULT NULL,
  `DeductionHeadID` varchar(5) NOT NULL,
  `DeductionHead` varchar(500) DEFAULT NULL,
  `DCalculationType` varchar(10) DEFAULT NULL,
  `DCalculationValue` decimal(10,2) DEFAULT NULL,
  `Formula` varchar(500) DEFAULT NULL,
  `Remark` varchar(1000) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MCaderwiseDeductions`
--

INSERT INTO `MCaderwiseDeductions` (`CompanyId`, `BranchId`, `CaderwiseDeductionId`, `CaderwiseDeductionDate`, `EmployeeTypeId`, `EmployeeType`, `EmployeeTypeGroup`, `DeductionHeadID`, `DeductionHead`, `DCalculationType`, `DCalculationValue`, `Formula`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '0001', '2023-12-14 00:00:00', '001', 'S', 'Staff', 'D0001', 'PF', 'Formula', 0.00, '(P2)*12/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-14 00:00:00', '001', 'S', 'Staff', 'D0002', 'ESIC', 'Formula', 0.00, '(P3)*0.75/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-14 00:00:00', '001', 'S', 'Staff', 'D0003', 'Professional Tax ', 'Amount', 200.00, '0', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-14 00:00:00', '001', 'S', 'Staff', 'D0004', 'MLWF', 'Amount', 0.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-14 00:00:00', '001', 'S', 'Staff', 'D0005', 'TDS', 'Amount', 200.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-14 00:00:00', '001', 'S', 'Staff', 'D0006', 'Arrear Deduct', 'Amount', 0.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0007', '2023-12-14 00:00:00', '002', 'T', 'Staff', 'D0001', 'PF', 'Formula', 0.00, '(P2)*12/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0007', '2023-12-14 00:00:00', '002', 'T', 'Staff', 'D0002', 'ESIC', 'Formula', 0.00, '(P3)*0.75/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0007', '2023-12-14 00:00:00', '002', 'T', 'Staff', 'D0005', 'TDS', 'Amount', 200.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MCaderwiseEarnings`
--

CREATE TABLE `MCaderwiseEarnings` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `CaderwiseEarningId` varchar(5) NOT NULL,
  `CaderwiseEarningDate` datetime DEFAULT NULL,
  `EmployeeTypeId` varchar(5) NOT NULL,
  `EmployeeType` varchar(50) DEFAULT NULL,
  `EmployeeTypeGroup` varchar(10) DEFAULT NULL,
  `EarningHeadId` varchar(5) NOT NULL,
  `EarningHead` varchar(500) DEFAULT NULL,
  `ECalculationType` varchar(10) DEFAULT NULL,
  `ECalculationValue` decimal(10,2) DEFAULT NULL,
  `Formula` varchar(500) DEFAULT NULL,
  `Remark` varchar(1000) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MCaderwiseEarnings`
--

INSERT INTO `MCaderwiseEarnings` (`CompanyId`, `BranchId`, `CaderwiseEarningId`, `CaderwiseEarningDate`, `EmployeeTypeId`, `EmployeeType`, `EmployeeTypeGroup`, `EarningHeadId`, `EarningHead`, `ECalculationType`, `ECalculationValue`, `Formula`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0002', 'Basic Salary', 'Formula', 0.00, '(P1)*(50/100)', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0003', 'Dearness Allowance', 'Formula', 0.00, '(P2)*24/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0004', 'House Rent Allowance', 'Formula', 0.00, '(P2)*50/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0005', 'Conveyance Allowance', 'Formula', 0.00, '(P2)*2/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0006', 'Special Allowance', 'Formula', 0.00, '(P2)*13/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0007', 'Personal Allowance', 'Formula', 0.00, '(P2)*24/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0008', 'Incentive Allowance', 'Amount', 500.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0009', 'Arrear Paid', 'Amount', 0.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0016', 'Performance Bonus', 'Formula', 0.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0018', 'LTA', 'Amount', 0.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0019', 'Gratuity', 'Amount', 0.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0001', '2023-12-01 00:00:00', '001', 'S', 'Staff', 'E0022', 'C-OFF Allowance', 'Amount', 0.00, NULL, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0013', '2023-12-02 00:00:00', '002', 'T', 'Staff', 'E0002', 'Basic Salary', 'Formula', 0.00, '(P1)*(50/100)', 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0013', '2023-12-02 00:00:00', '002', 'T', 'Staff', 'E0003', 'Dearness Allowance', 'Formula', 0.00, '(P2)*24/100', 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0013', '2023-12-02 00:00:00', '002', 'T', 'Staff', 'E0004', 'House Rent Allowance', 'Formula', 0.00, '(P2)*50/100', 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0013', '2023-12-02 00:00:00', '002', 'T', 'Staff', 'E0005', 'Conveyance Allowance', 'Formula', 0.00, '(P2)*2/100', 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0013', '2023-12-02 00:00:00', '002', 'T', 'Staff', 'E0006', 'Special Allowance', 'Formula', 0.00, '(P2)*13/100', 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0013', '2023-12-02 00:00:00', '002', 'T', 'Staff', 'E0007', 'Personal Allowance', 'Formula', 0.00, '(P2)*24/100', 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0013', '2023-12-02 00:00:00', '002', 'T', 'Staff', 'E0008', 'Incentive Allowance', 'Amount', 500.00, NULL, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0020', '2023-12-01 00:00:00', '005', 'Y', 'Staff', 'E0002', 'Basic Salary', 'Formula', 0.00, '(P1)*(50/100)', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0020', '2023-12-01 00:00:00', '005', 'Y', 'Staff', 'E0003', 'Dearness Allowance', 'Formula', 0.00, '(P2)*24/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0020', '2023-12-01 00:00:00', '005', 'Y', 'Staff', 'E0004', 'House Rent Allowance', 'Formula', 0.00, '(P2)*50/100', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0020', '2023-12-01 00:00:00', '005', 'Y', 'Staff', 'E0005', 'Conveyance Allowance', 'Formula', 0.00, '(P2)*2/100', 'remark', 'Y', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MCompanies`
--

CREATE TABLE `MCompanies` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `CompanySectorId` int(255) DEFAULT NULL,
  `CompanySector` varchar(255) DEFAULT NULL,
  `CompanyName` varchar(255) DEFAULT NULL,
  `ShortName` varchar(255) DEFAULT NULL,
  `NatureOfBusiness` varchar(255) DEFAULT NULL,
  `Logo` blob DEFAULT NULL,
  `AcFlag` varchar(255) DEFAULT NULL,
  `CreatedBy` varchar(255) DEFAULT NULL,
  `CreatedByName` varchar(255) DEFAULT NULL,
  `ModifiedBy` varchar(255) DEFAULT NULL,
  `ModifiedByName` varchar(255) DEFAULT NULL,
  `IUFlag` varchar(255) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `SingleCompany` varchar(10) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `ModifiedOn` datetime DEFAULT NULL,
  `FieldId` varchar(255) DEFAULT NULL,
  `FieldName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MCompanies`
--

INSERT INTO `MCompanies` (`CompanyId`, `CompanySectorId`, `CompanySector`, `CompanyName`, `ShortName`, `NatureOfBusiness`, `Logo`, `AcFlag`, `CreatedBy`, `CreatedByName`, `ModifiedBy`, `ModifiedByName`, `IUFlag`, `Status`, `SingleCompany`, `CreatedOn`, `ModifiedOn`, `FieldId`, `FieldName`, `createdAt`, `updatedAt`) VALUES
('00001', 1, 'Automation', 'SysTech Solutions', 'SYS', 'B2B', '', 'Y', 'Admin', '', NULL, '', 'I', NULL, 'true', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '2023-12-28 17:42:18', '2023-12-28 17:42:18'),
('00002', 2, 'Healthcare', 'HealTech', 'HTC', 'SaaS', '', 'Y', 'Admin', '', NULL, '', 'I', NULL, 'true', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '2023-12-28 17:42:51', '2023-12-28 17:42:51'),
('00003', 3, 'Electrical Automation', '5S Innovations LLP', '5SL', 'B2B', '', 'Y', 'Admin', '', NULL, '', 'I', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '2023-12-28 17:43:31', '2023-12-28 17:43:31');

--
-- Triggers `MCompanies`
--
DELIMITER $$
CREATE TRIGGER `before_insert_MCompanies` BEFORE INSERT ON `MCompanies` FOR EACH ROW BEGIN
    SET NEW.CompanySectorId = (SELECT IFNULL(MAX(CompanySectorId), 0) + 1 FROM MCompanies);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `MCostCenter`
--

CREATE TABLE `MCostCenter` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `CostCenterId` int(11) NOT NULL,
  `CostCenterName` varchar(500) NOT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `Remark` varchar(500) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MCostCenter`
--

INSERT INTO `MCostCenter` (`CompanyId`, `BranchId`, `CostCenterId`, `CostCenterName`, `AcFlag`, `Remark`, `Status`) VALUES
('2', '00001', 1, 'Marketing', 'Y', 'text', '1'),
('2', '00001', 2, 'Sales', 'Y', 'Remark', '1'),
('2', '00001', 3, 'Human Resources', 'Y', 'Remark', '1'),
('2', '00001', 4, 'IT', 'Y', 'Remark', '1'),
('2', '00001', 5, 'Operations', 'Y', 'Remark', '1'),
('2', '00001', 6, 'Customer Service', 'Y', 'remark', '1');

-- --------------------------------------------------------

--
-- Table structure for table `MDeductionHeads`
--

CREATE TABLE `MDeductionHeads` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `DeductionHeadID` varchar(5) NOT NULL,
  `DeductionHead` varchar(500) DEFAULT NULL,
  `DeductionType` varchar(100) DEFAULT 'Salary',
  `ShortName` varchar(3) DEFAULT NULL,
  `HeadPosition` int(11) DEFAULT NULL,
  `CalculationType` varchar(10) DEFAULT 'Amount',
  `CalculationValue` decimal(10,2) DEFAULT 0.00,
  `SalaryParameter1` varchar(5) DEFAULT NULL,
  `SalaryParameter2` varchar(5) DEFAULT NULL,
  `SalaryParameter3` varchar(5) DEFAULT NULL,
  `SalaryParameter4` varchar(5) DEFAULT NULL,
  `SalaryParameter5` varchar(5) DEFAULT NULL,
  `SalaryParameter6` varchar(5) DEFAULT NULL,
  `SalaryParameter7` varchar(5) DEFAULT NULL,
  `SalaryParameter8` varchar(5) DEFAULT NULL,
  `SalaryParameter9` varchar(5) DEFAULT NULL,
  `SalaryParameter10` varchar(5) DEFAULT NULL,
  `Formula` varchar(500) DEFAULT NULL,
  `Remark` varchar(1000) DEFAULT NULL,
  `AcFlag` varchar(1) NOT NULL DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MDeductionHeads`
--

INSERT INTO `MDeductionHeads` (`CompanyId`, `BranchId`, `DeductionHeadID`, `DeductionHead`, `DeductionType`, `ShortName`, `HeadPosition`, `CalculationType`, `CalculationValue`, `SalaryParameter1`, `SalaryParameter2`, `SalaryParameter3`, `SalaryParameter4`, `SalaryParameter5`, `SalaryParameter6`, `SalaryParameter7`, `SalaryParameter8`, `SalaryParameter9`, `SalaryParameter10`, `Formula`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 'D0001', 'PF', 'Salary', 'PF', 1, 'Formula', 0.00, 'E0002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P2)*12/100', 'pfpfpfpfpfpf', 'Y', NULL, NULL, 'admin', '2022-05-11 12:05:17'),
('00001', '00001', 'D0002', 'ESIC', 'Salary', 'ESI', 2, 'Formula', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P3)*0.75/100', NULL, 'Y', NULL, NULL, 'admin', '2022-04-21 11:00:51'),
('00001', '00001', 'D0003', 'Professional Tax ', 'Salary', 'PT', 3, 'Amount', 200.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', NULL, 'Y', NULL, NULL, 'admin', '2022-04-25 11:24:45'),
('00001', '00001', 'D0004', 'MLWF', 'Salary', 'MLW', 4, 'Amount', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 'D0005', 'TDS', 'Salary', 'TDS', 5, 'Amount', 200.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 'D0006', 'Arrear Deduct', 'Salary', 'AD', 6, 'Amount', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 'D0007', 'Advance', 'Salary', 'ADV', 7, 'Amount', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 'D0008', 'Fine', 'Salary', 'FN', 8, 'Amount', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 'D0009', 'Insurance', 'Salary', 'INS', 9, 'Amount', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 'D0010', 'E-PF1', 'CTC', 'PF1', 11, 'Formula', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P2)*8.33/100', NULL, 'Y', NULL, NULL, 'admin', '2022-04-19 14:14:10'),
('00001', '00001', 'D0011', 'E-PF2', 'CTC', 'PF2', 12, 'Formula', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P2)*3.67/100', NULL, 'Y', NULL, NULL, 'admin', '2022-04-19 14:14:31'),
('00001', '00001', 'D0012', 'E-PF3', 'CTC', 'PF3', 13, 'Formula', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 'D0013', 'Income Tax', 'CTC', 'Tax', 10, 'Formula', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', NULL, NULL, 'admin', NULL),
('00001', '00001', 'D0014', 'Gross', 'Salary', 'GRS', 1, 'Formula', 0.00, 'E0001', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', 'GRS01', NULL, 'N', 'admin', '2022-05-11 12:02:11', 'admin', '2022-05-11 12:02:11'),
('00001', '00001', 'D0015', 'LTA', 'Salary', 'LTA', 0, 'Amount', 1.00, 'E0018', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', 'S=LTA*1', 'LTALTA', 'N', 'admin', '2022-05-11 12:06:14', 'admin', '2022-05-12 11:27:36'),
('00001', '00001', 'D0016', 'Bonus', 'Salary', 'BNS', 1, 'Amount', 1.00, 'E0020', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', 'dfgfg', 'dfghfh', 'N', 'admin', '2022-05-11 12:11:27', 'admin', '2022-05-11 12:11:27'),
('00001', '00001', 'D0017', 'over time', 'Salary', 'OT', 1, 'Amount', 1.00, 'E0021', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', 'S=OT*1', 'OVERTIME11', 'N', 'admin', '2022-05-11 12:12:59', 'admin', '2022-05-11 12:14:42');

-- --------------------------------------------------------

--
-- Table structure for table `MDepartments`
--

CREATE TABLE `MDepartments` (
  `CompanyId` int(11) NOT NULL DEFAULT 1,
  `BranchId` int(11) NOT NULL DEFAULT 1,
  `DepartmentId` int(11) NOT NULL,
  `ParentDeptId` varchar(255) NOT NULL,
  `DepartmentType` varchar(255) NOT NULL,
  `DepartmentName` varchar(255) DEFAULT NULL,
  `DepartmentGroupId` varchar(255) DEFAULT NULL,
  `CostCenterId` varchar(255) DEFAULT NULL,
  `BranchName` varchar(255) DEFAULT NULL,
  `DepartmentHeadId` varchar(255) DEFAULT NULL,
  `DepartmentSubHeadId` varchar(255) DEFAULT NULL,
  `DepartmentStdStaffStrength` int(11) DEFAULT NULL,
  `DepartmentStdWorkerStrength` int(11) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  `AcFlag` varchar(255) DEFAULT NULL,
  `IUFlag` varchar(255) DEFAULT NULL,
  `CreatedBy` varchar(255) NOT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MDepartments`
--

INSERT INTO `MDepartments` (`CompanyId`, `BranchId`, `DepartmentId`, `ParentDeptId`, `DepartmentType`, `DepartmentName`, `DepartmentGroupId`, `CostCenterId`, `BranchName`, `DepartmentHeadId`, `DepartmentSubHeadId`, `DepartmentStdStaffStrength`, `DepartmentStdWorkerStrength`, `Remark`, `AcFlag`, `IUFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Payroll Department', 'Main', 'Dep1', 'Services', '', 'Main Branch', 'Mrs.123', 'Mr345', 25, 25, 'Pune', 'Y', 'I', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00', '2023-12-03 16:33:44', '2023-12-03 16:33:44'),
(1, 1, 2, 'Packaging Department', 'Sub', 'Depart2', 'Production', 'Customer Service', 'Main Branch', 'nbbhh', 'asas', 15, 20, 'text', 'Y', 'I', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00', '2023-12-03 16:53:27', '2023-12-03 16:53:27');

-- --------------------------------------------------------

--
-- Table structure for table `MDesignations`
--

CREATE TABLE `MDesignations` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `DesignationId` int(5) NOT NULL,
  `DesignationName` varchar(500) NOT NULL,
  `ReportDesignationId` varchar(50) DEFAULT NULL,
  `ShortName` varchar(3) DEFAULT NULL,
  `DesignationsPosition` int(11) DEFAULT 1,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MDesignations`
--

INSERT INTO `MDesignations` (`CompanyId`, `BranchId`, `DesignationId`, `DesignationName`, `ReportDesignationId`, `ShortName`, `DesignationsPosition`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, 'Administrator', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 2, 'Project Manager', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 3, 'Senior Engineer', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 4, 'Senior Technician', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 5, 'Office Boy', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 6, 'Maintainence', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 7, 'CEO', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 8, 'CTO', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 9, 'CFO', '00001', '', 1, 'Remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 10, 'COO', '00001', '', 1, 'Remark', 'N', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MDevices`
--

CREATE TABLE `MDevices` (
  `CompanyId` varchar(5) NOT NULL,
  `BranchId` varchar(5) NOT NULL,
  `DeviceId` varchar(5) NOT NULL,
  `DeviceName` varchar(100) DEFAULT NULL,
  `IpAddress` varchar(100) DEFAULT NULL,
  `PortNo` varchar(100) DEFAULT NULL,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT NULL,
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MDevices`
--

INSERT INTO `MDevices` (`CompanyId`, `BranchId`, `DeviceId`, `DeviceName`, `IpAddress`, `PortNo`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('', '', '00001', 'Mukta\'s PC', '132', '3', 'text', 'Y', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MEarningHeads`
--

CREATE TABLE `MEarningHeads` (
  `CompanyId` varchar(255) NOT NULL DEFAULT '00001',
  `BranchId` varchar(255) NOT NULL DEFAULT '00001',
  `EarningHeadId` varchar(5) NOT NULL,
  `EarningHead` varchar(255) NOT NULL,
  `EarningType` varchar(255) DEFAULT 'Salary',
  `ShortName` varchar(255) DEFAULT NULL,
  `HeadPosition` int(11) NOT NULL,
  `CalculationType` varchar(255) DEFAULT NULL,
  `CalculationValue` decimal(10,2) NOT NULL,
  `SalaryParameter1` varchar(255) DEFAULT NULL,
  `SalaryParameter2` varchar(255) DEFAULT NULL,
  `SalaryParameter3` varchar(255) DEFAULT NULL,
  `SalaryParameter4` varchar(255) DEFAULT NULL,
  `SalaryParameter5` varchar(255) DEFAULT NULL,
  `SalaryParameter6` varchar(255) DEFAULT NULL,
  `SalaryParameter7` varchar(255) DEFAULT NULL,
  `SalaryParameter8` varchar(255) DEFAULT NULL,
  `SalaryParameter9` varchar(255) DEFAULT NULL,
  `SalaryParameter10` varchar(255) DEFAULT NULL,
  `Formula` varchar(255) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  `AcFlag` varchar(255) DEFAULT NULL,
  `CreatedBy` varchar(255) DEFAULT NULL,
  `ModifiedBy` varchar(255) DEFAULT NULL,
  `FieldId` varchar(255) DEFAULT NULL,
  `FieldName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEarningHeads`
--

INSERT INTO `MEarningHeads` (`CompanyId`, `BranchId`, `EarningHeadId`, `EarningHead`, `EarningType`, `ShortName`, `HeadPosition`, `CalculationType`, `CalculationValue`, `SalaryParameter1`, `SalaryParameter2`, `SalaryParameter3`, `SalaryParameter4`, `SalaryParameter5`, `SalaryParameter6`, `SalaryParameter7`, `SalaryParameter8`, `SalaryParameter9`, `SalaryParameter10`, `Formula`, `Remark`, `AcFlag`, `CreatedBy`, `ModifiedBy`, `FieldId`, `FieldName`) VALUES
('00001', '00001', 'E0001', 'Gross', 'Salary', 'GRS', 0, 'Formula', 0.00, 'E0001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'P1', 'KKR', 'N', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-05-12 11:25:38.467'),
('00001', '00001', 'E0002', 'Basic Salary', 'Salary', 'BSC', 1, 'Formula', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P1)*(50/100)', 'bsc sal', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-05-11 10:43:46.157'),
('00001', '00001', 'E0003', 'Dearness Allowance', 'Salary', 'DA', 2, 'Formula', 0.00, 'E0001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P2)*24/100', NULL, 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-04-21 18:42:47.650'),
('00001', '00001', 'E0004', 'House Rent Allowance', 'Salary', 'HRA', 3, 'Formula', 0.00, 'E0002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P2)*50/100', 'House Rent Allowance', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-04-21 18:42:05.617'),
('00001', '00001', 'E0005', 'Conveyance Allowance', 'Salary', 'CA', 4, 'Formula', 0.00, 'E0001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P2)*2/100', 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-04-21 18:43:15.653'),
('00001', '00001', 'E0006', 'Special Allowance', 'Salary', 'SA', 5, 'Formula', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '(P2)*13/100', 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0007', 'Personal Allowance', 'Salary', 'PA', 6, 'Formula', 0.00, 'E0001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(P2)*24/100', 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-04-21 18:43:36.683'),
('00001', '00001', 'E0008', 'Incentive Allowance', 'Salary', 'IA', 7, 'Amount', 500.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0009', 'Arrear Paid', 'Salary', 'AP', 8, 'Amount', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0010', 'Attendance Allowance', 'Salary', 'AA', 9, 'Amount', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0011', 'Night Allowance', 'Salary', 'NA', 10, 'Formula', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0012', 'Travelling Allowance', 'Salary', 'TA', 11, 'Amount', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0013', 'Medical Allowance', 'Salary', 'MA', 13, 'Formula', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0014', 'Communication Allowance', 'Salary', 'CMA', 14, 'Amount', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0015', 'Education Allowance', 'Salary', 'EA', 15, 'Amount', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0016', 'Performance Bonus', 'Salary', 'PB', 16, 'Formula', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0017', 'Referral  Allowance', 'Salary', 'RA', 17, 'Amount', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0018', 'LTA', 'CTC', 'LTA', 18, 'Amount', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0019', 'Gratuity', 'CTC', 'GRT', 19, 'Amount', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0020', 'Bonus', 'Bonus', 'BNS', 20, 'Formula', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0021', 'Over Time', 'OT', 'OT', 21, 'Formula', 0.00, 'E0001', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', NULL, 'ffsd', 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0022', 'C-OFF Allowance', 'Salary', 'CFA', 12, 'Amount', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y', 'admin', '2022-01-15 10:32:08.647', 'admin', '2022-01-15 12:31:34.620'),
('00001', '00001', 'E0026', 'MLWF', 'Salary', 'MLW', 0, 'Amount', 1.00, 'D0004', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', NULL, 'mlwfljjh', 'Y', 'admin', '2022-05-11 11:13:52.533', 'admin', '2022-05-11 11:13:52.533'),
('00001', '00001', 'E0027', 'Fine', 'Salary', 'FN', 0, 'Amount', 0.00, 'D0008', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', '00000', NULL, 'FNFND', 'Y', 'admin', '2022-05-11 11:24:04.883', 'admin', '2022-05-11 11:24:04.883');

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeeAcademics`
--

CREATE TABLE `MEmployeeAcademics` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeId` int(5) NOT NULL,
  `Qualification` varchar(350) NOT NULL,
  `Institute` varchar(500) DEFAULT NULL,
  `Specialization` varchar(500) DEFAULT NULL,
  `Grades` varchar(1000) DEFAULT NULL,
  `PassingYear` varchar(15) DEFAULT NULL,
  `Remark` varchar(1000) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) NOT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(5) NOT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeeAcademics`
--

INSERT INTO `MEmployeeAcademics` (`CompanyId`, `BranchId`, `EmployeeId`, `Qualification`, `Institute`, `Specialization`, `Grades`, `PassingYear`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, 'B.tech,Diploma', 'VIT,MSBTE', 'CS,CS', '8.5,98', '2024,2021', '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', 2, '', '', '', NULL, '', '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', 3, '', '', '', NULL, '', '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', 4, '', '', '', NULL, '', '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeeFamilies`
--

CREATE TABLE `MEmployeeFamilies` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeId` int(5) NOT NULL,
  `PersonName` varchar(350) NOT NULL,
  `Relation` varchar(500) DEFAULT NULL,
  `Education` varchar(500) DEFAULT NULL,
  `Occupation` varchar(500) DEFAULT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `CellNo` varchar(500) DEFAULT NULL,
  `EmailId` varchar(500) DEFAULT NULL,
  `Nominee` varchar(10) DEFAULT 'No',
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) NOT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(5) NOT NULL,
  `ModifiedOn` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeeFamilies`
--

INSERT INTO `MEmployeeFamilies` (`CompanyId`, `BranchId`, `EmployeeId`, `PersonName`, `Relation`, `Education`, `Occupation`, `Address`, `CellNo`, `EmailId`, `Nominee`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `createdAt`, `updatedAt`) VALUES
('00001', '00001', 1, 'Pedro Pascal,Anne Hatahway', 'Father,Mother', 'MSC,MSC', 'Actor,Actor', 'California,California', '5738573838,8484384838', 'email1,email2', 'Yes,Yes', '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00', '2023-11-25 16:35:23', '2023-11-30 04:15:45'),
('00001', '00001', 2, '', '', '', '', '', '', '', '', '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00', '2023-12-06 17:51:17', '2023-12-06 17:51:17'),
('00001', '00001', 3, '', '', '', '', '', '', '', '', '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00', '2023-12-08 07:44:46', '2023-12-08 07:44:46'),
('00001', '00001', 4, '', '', '', '', '', '', '', '', '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00', '2023-12-23 14:43:41', '2023-12-23 14:43:41');

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeeGrades`
--

CREATE TABLE `MEmployeeGrades` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeGradeId` int(3) NOT NULL,
  `EmployeeGradeName` varchar(500) NOT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) DEFAULT NULL,
  `CreatedOn` varchar(10) DEFAULT NULL,
  `ModifiedBy` varchar(5) DEFAULT NULL,
  `ModifiedOn` varchar(10) DEFAULT NULL,
  `Remark` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeeGrades`
--

INSERT INTO `MEmployeeGrades` (`CompanyId`, `BranchId`, `EmployeeGradeId`, `EmployeeGradeName`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `Remark`) VALUES
('00001', '00001', 1, 'Grade 1', 'Y', NULL, NULL, NULL, NULL, 'Remark'),
('00001', '00001', 2, 'Grade 2', 'Y', NULL, NULL, NULL, NULL, 'Remark'),
('00001', '00001', 3, 'Grade 3', 'Y', NULL, NULL, NULL, NULL, 'Remark'),
('00001', '00001', 4, 'Grade 4', 'Y', NULL, NULL, NULL, NULL, 'Remark'),
('00001', '00001', 5, 'Special Grade', 'N', NULL, NULL, NULL, NULL, 'Remark');

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeeProfessionals`
--

CREATE TABLE `MEmployeeProfessionals` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeId` int(5) NOT NULL,
  `Employer` varchar(350) NOT NULL,
  `Experience` varchar(500) DEFAULT NULL,
  `Designation` varchar(500) DEFAULT NULL,
  `JobResponsibility` varchar(1000) DEFAULT NULL,
  `Salary` varchar(500) DEFAULT NULL,
  `CVFile` varchar(500) DEFAULT NULL,
  `SalarySlipFile` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `Remark` varchar(1000) DEFAULT NULL,
  `CreatedBy` varchar(5) NOT NULL,
  `CreatedOn` varchar(10) DEFAULT NULL,
  `ModifiedBy` varchar(5) NOT NULL,
  `ModifiedOn` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeeProfessionals`
--

INSERT INTO `MEmployeeProfessionals` (`CompanyId`, `BranchId`, `EmployeeId`, `Employer`, `Experience`, `Designation`, `JobResponsibility`, `Salary`, `CVFile`, `SalarySlipFile`, `AcFlag`, `Remark`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, 'ABC,DEF', '2 years,3 years', 'SDE,SDE', 'SDE,SDE', '500000,500000', '', '', 'Y', '', '', '', '', ''),
('00001', '00001', 2, 'HNS,MGK,INS', '2 years,2 years,4 years', 'SDE,SDE,PM', 'SDE,SDE,PM', '400000,500000,800000', NULL, NULL, 'Y', NULL, '', NULL, '', NULL),
('00001', '00001', 3, 'ABC', '2 years', 'SDE', 'SDE', '500000', NULL, NULL, 'Y', NULL, '', NULL, '', NULL),
('00001', '00001', 4, '', '', '', '', '', '', '', 'Y', '', '', '', '', ''),
('00001', '00001', 5, '', '', '', '', '', '', '', 'Y', '', '', '', '', ''),
('00001', '00001', 6, '', '', '', '', '', '', '', 'Y', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `MEmployees`
--

CREATE TABLE `MEmployees` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeTypeId` varchar(50) NOT NULL DEFAULT '001',
  `EmployeeId` int(11) NOT NULL,
  `EmployeeName` varchar(500) DEFAULT NULL,
  `EmployeeTypeGroupId` varchar(50) DEFAULT NULL,
  `Salutation` varchar(50) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `MiddleName` varchar(255) DEFAULT NULL,
  `MEmployeeName` varchar(255) DEFAULT NULL,
  `AadharCardNo` varchar(100) DEFAULT NULL,
  `PANNo` varchar(100) DEFAULT NULL,
  `PassportNo` varchar(100) DEFAULT NULL,
  `PassportIssueDate` varchar(50) DEFAULT NULL,
  `PassportExpireDate` datetime DEFAULT NULL,
  `CurrentAddress` varchar(1000) DEFAULT NULL,
  `CurrentPincode` varchar(10) DEFAULT NULL,
  `PermanentAddress` varchar(1000) DEFAULT NULL,
  `PermanentPincode` varchar(10) DEFAULT NULL,
  `DOB` varchar(50) DEFAULT NULL,
  `EmailId1` varchar(100) DEFAULT NULL,
  `EmailId2` varchar(100) DEFAULT NULL,
  `PhoneNo` varchar(15) DEFAULT NULL,
  `CellNo1` varchar(15) DEFAULT NULL,
  `CellNo2` varchar(15) DEFAULT NULL,
  `BankId1` varchar(50) DEFAULT NULL,
  `AccountNo1` varchar(100) DEFAULT NULL,
  `IFSCCode1` varchar(50) DEFAULT NULL,
  `BankId2` varchar(50) DEFAULT NULL,
  `AccountNo2` varchar(100) DEFAULT NULL,
  `IFSCCode2` varchar(50) DEFAULT NULL,
  `MaritalStatus` varchar(15) DEFAULT NULL,
  `ReferenceId` varchar(50) DEFAULT NULL,
  `DestinationId` varchar(50) DEFAULT NULL,
  `ReligionId` varchar(50) DEFAULT NULL,
  `CategoryId` varchar(50) DEFAULT NULL,
  `CasteId` varchar(50) DEFAULT NULL,
  `EmployeePhoto` blob DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `BloodGroup` varchar(10) DEFAULT NULL,
  `DrivingLicence` blob DEFAULT NULL,
  `FinanceAccountNo` varchar(100) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(50) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `ModifiedBy` varchar(50) DEFAULT NULL,
  `ModifiedOn` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployees`
--

INSERT INTO `MEmployees` (`CompanyId`, `BranchId`, `EmployeeTypeId`, `EmployeeId`, `EmployeeName`, `EmployeeTypeGroupId`, `Salutation`, `LastName`, `FirstName`, `MiddleName`, `MEmployeeName`, `AadharCardNo`, `PANNo`, `PassportNo`, `PassportIssueDate`, `PassportExpireDate`, `CurrentAddress`, `CurrentPincode`, `PermanentAddress`, `PermanentPincode`, `DOB`, `EmailId1`, `EmailId2`, `PhoneNo`, `CellNo1`, `CellNo2`, `BankId1`, `AccountNo1`, `IFSCCode1`, `BankId2`, `AccountNo2`, `IFSCCode2`, `MaritalStatus`, `ReferenceId`, `DestinationId`, `ReligionId`, `CategoryId`, `CasteId`, `EmployeePhoto`, `Gender`, `BloodGroup`, `DrivingLicence`, `FinanceAccountNo`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '001', 1, 'Charles Leclerc', 'Staff', 'Dear [Mr./Ms./Dr.] [Last Name]', 'Leclerc', 'Charles', 'Perceval ', '', '', '', '', '', NULL, 'Pune', '463526', 'Monaco', '737472', '1999-09-27', '4984984', '984984984984', '988977894', '98498498', '498498498', '984984', '98498498', '4984984984', '984984984', '984984984', '98498498', '', 'Supervisor/Manager References', 'Destination', 'Religion 1', 'Category 2', 'Caste 1', 0x5b6f626a656374204f626a6563745d, 'Male', 'A-', 0x5b6f626a656374204f626a6563745d, '', '', 'Y', '', '', '', ''),
('00001', '00001', '004', 2, 'Bruce  Wayne', 'Worker', 'Dear [Mr./Ms./Dr.] [Last Name]', 'Wayne', 'Bruce ', 'Thomas', '', '', '', '', '', NULL, 'Pune', '843747', '', '', '2023-12-04', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0x5b6f626a656374204f626a6563745d, '', '', 0x5b6f626a656374204f626a6563745d, '', '', 'Y', '', '', '', ''),
('00001', '00001', '005', 3, 'Udayan Gaikwad', 'Worker', 'Sir/Madam', 'Gaikwad', 'Udayan', 'Fathesingh', '', '', '', '', '', NULL, 'Brahma Avenue, Kondhwa, Pune', '843747', 'Pune', '411048', '', 'udayanfg@gmail.com', 'udayanfg@gmail.com', '07219629734', '123123123', '', '', '', '', '', '', '', '', '', '', '', '', '', 0x5b6f626a656374204f626a6563745d, '', '', 0x5b6f626a656374204f626a6563745d, '', '', 'Y', '', '', '', ''),
('00001', '00001', '001', 4, 'Harshvardhan Reddy', 'Staff', 'Dear [Mr./Ms./Dr.] [Last Name]', 'Reddy', 'Harshvardhan', 'James', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', '1991-06-12', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Y', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeeSalaries`
--

CREATE TABLE `MEmployeeSalaries` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeId` int(5) NOT NULL,
  `GradeId` varchar(5) NOT NULL DEFAULT '00001',
  `BandId` varchar(5) NOT NULL DEFAULT '00001',
  `CTC` decimal(10,2) DEFAULT 0.00,
  `GrossSalary` decimal(10,2) DEFAULT 0.00,
  `OTFlag` varchar(10) DEFAULT 'false',
  `OTAmount` decimal(10,2) DEFAULT 0.00,
  `PFFlag` varchar(10) DEFAULT 'false',
  `PFNo` varchar(50) DEFAULT NULL,
  `PFDate` datetime DEFAULT NULL,
  `ESICFlag` varchar(10) DEFAULT 'false',
  `ESICNo` varchar(50) DEFAULT NULL,
  `ESICDate` datetime DEFAULT NULL,
  `UANNo` varchar(50) DEFAULT NULL,
  `MLWFFlag` varchar(10) DEFAULT 'false',
  `MLWFNo` varchar(50) DEFAULT NULL,
  `GratuityApplicable` varchar(10) DEFAULT 'false',
  `GratuityAmount` decimal(10,2) DEFAULT 0.00,
  `Remark` varchar(1000) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(5) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeeSalaries`
--

INSERT INTO `MEmployeeSalaries` (`CompanyId`, `BranchId`, `EmployeeId`, `GradeId`, `BandId`, `CTC`, `GrossSalary`, `OTFlag`, `OTAmount`, `PFFlag`, `PFNo`, `PFDate`, `ESICFlag`, `ESICNo`, `ESICDate`, `UANNo`, `MLWFFlag`, `MLWFNo`, `GratuityApplicable`, `GratuityAmount`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, 'Grade', 'Band ', 1200000.00, 43069.00, 'f', 0.00, 't', '39391', '2023-12-16 00:00:00', 't', '49329', '2023-12-21 00:00:00', '26', 't', '939234', 't', 92394.00, 'remark', 'Y', '', NULL, '', NULL),
('00001', '00001', 2, '', '', 0.00, 76939.00, '', 0.00, '', '', NULL, '', '', NULL, '', '', '', '', 0.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', 3, '', '', 0.00, 0.00, '', 0.00, '', '', NULL, '', '', NULL, '', '', '', '', 0.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', 4, '', '', 0.00, 0.00, '', 0.00, '', '', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', '', '', '', '', 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeeTypes`
--

CREATE TABLE `MEmployeeTypes` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeTypeId` varchar(3) NOT NULL,
  `EmployeeType` varchar(50) NOT NULL,
  `EmployeeTypeGroup` varchar(50) NOT NULL,
  `ShortName` varchar(1) DEFAULT NULL,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) DEFAULT NULL,
  `CreatedOn` varchar(10) DEFAULT NULL,
  `ModifiedBy` varchar(5) DEFAULT NULL,
  `ModifiedOn` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeeTypes`
--

INSERT INTO `MEmployeeTypes` (`CompanyId`, `BranchId`, `EmployeeTypeId`, `EmployeeType`, `EmployeeTypeGroup`, `ShortName`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '001', 'Company Staff', 'Staff', 'S', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '002', 'Trainee Staff', 'Staff', 'T', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '003', 'Worker', 'Worker', 'W', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '004', 'Trainee Worker', 'Worker', 'O', 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '005', 'Contract Staff', 'Staff', 'Y', 'remark', 'Y', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeewiseDeduction`
--

CREATE TABLE `MEmployeewiseDeduction` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeId` varchar(7) NOT NULL,
  `EmployeewiseDeductionId` varchar(5) NOT NULL DEFAULT '00001',
  `SrNo` bigint(20) DEFAULT NULL,
  `EmployeewiseDeductionDate` datetime DEFAULT NULL,
  `EmployeeTypeId` varchar(5) NOT NULL,
  `EmployeeType` varchar(50) DEFAULT NULL,
  `EmployeeTypeGroup` varchar(10) DEFAULT NULL,
  `DeductionHeadId` varchar(5) NOT NULL,
  `DeductionHead` varchar(500) DEFAULT NULL,
  `DCalculationType` varchar(10) DEFAULT NULL,
  `DCalculationValue` decimal(10,2) DEFAULT 0.00,
  `Formula` varchar(500) DEFAULT NULL,
  `Remark` varchar(200) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(5) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeewiseDeductions`
--

CREATE TABLE `MEmployeewiseDeductions` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeId` varchar(7) NOT NULL,
  `EmployeewiseDeductionId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeewiseDeductionDate` datetime DEFAULT current_timestamp(),
  `EmployeeTypeId` varchar(5) NOT NULL,
  `EmployeeType` varchar(50) DEFAULT NULL,
  `EmployeeTypeGroup` varchar(10) DEFAULT NULL,
  `DeductionHeadId` varchar(5) NOT NULL,
  `DeductionHead` varchar(500) DEFAULT NULL,
  `DCalculationType` varchar(10) DEFAULT NULL,
  `DCalculationValue` decimal(10,2) DEFAULT 0.00,
  `Formula` varchar(500) DEFAULT NULL,
  `Remark` varchar(200) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(5) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeewiseDeductions`
--

INSERT INTO `MEmployeewiseDeductions` (`CompanyId`, `BranchId`, `EmployeeId`, `EmployeewiseDeductionId`, `EmployeewiseDeductionDate`, `EmployeeTypeId`, `EmployeeType`, `EmployeeTypeGroup`, `DeductionHeadId`, `DeductionHead`, `DCalculationType`, `DCalculationValue`, `Formula`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '1', 'S0001', '2023-12-15 15:45:52', '001', 'S', 'Staff', 'D0001', 'PF', 'Formula', 0.00, 'P2*(12/100)', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '1', 'S0002', '2023-12-15 15:45:52', '001', 'S', 'Staff', 'D0002', 'ESIC', 'Formula', 0.00, 'P3*(0.75/100)', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '1', 'S0003', '2023-12-15 15:45:52', '001', 'S', 'Staff', 'D0003', 'Professional Tax', 'Amount', 900.00, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '1', 'S0004', '2023-12-15 15:45:52', '001', 'S', 'Staff', 'D0004', 'MLWF', 'Amount', 340.00, NULL, NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '1', 'S0005', '2023-12-15 15:45:52', '001', 'S', 'Staff', 'D0005', 'TDS', 'Amount', 1200.00, NULL, NULL, 'Y', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeewiseEarnings`
--

CREATE TABLE `MEmployeewiseEarnings` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeId` int(7) NOT NULL,
  `EmployeewiseEarningId` varchar(5) NOT NULL,
  `EmployeewiseEarningDate` datetime DEFAULT current_timestamp(),
  `EmployeeTypeId` varchar(5) NOT NULL,
  `EmployeeType` varchar(50) DEFAULT NULL,
  `EmployeeTypeGroup` varchar(10) DEFAULT NULL,
  `EarningHeadId` varchar(5) NOT NULL,
  `EarningHead` varchar(500) DEFAULT NULL,
  `ECalculationType` varchar(10) DEFAULT NULL,
  `ECalculationValue` decimal(10,2) DEFAULT 0.00,
  `Formula` varchar(500) DEFAULT NULL,
  `ModifiedBy` varchar(5) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL,
  `Remark` varchar(1000) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeewiseEarnings`
--

INSERT INTO `MEmployeewiseEarnings` (`CompanyId`, `BranchId`, `EmployeeId`, `EmployeewiseEarningId`, `EmployeewiseEarningDate`, `EmployeeTypeId`, `EmployeeType`, `EmployeeTypeGroup`, `EarningHeadId`, `EarningHead`, `ECalculationType`, `ECalculationValue`, `Formula`, `ModifiedBy`, `ModifiedOn`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`) VALUES
('00001', '00001', 1, 'S0001', '2023-12-16 04:33:29', '001', 'S', 'Staff', 'E0002', 'Basic Salary', 'Formula', 0.00, '(P1)*(50/100)', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0002', '2023-12-16 04:33:29', '001', 'S', 'Staff', 'E0003', 'Dearness Allowance', 'Formula', 0.00, '(P2)*24/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0003', '2023-12-16 04:33:29', '001', 'S', 'Staff', 'E0004', 'House Rent Allowance', 'Formula', 0.00, '(P2)*50/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0004', '2023-12-16 04:33:29', '001', 'S', 'Staff', 'E0005', 'Conveyance Allowance', 'Formula', 0.00, '(P2)*2/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0005', '2023-12-16 04:33:29', '001', 'S', 'Staff', 'E0006', 'Special Allowance', 'Formula', 0.00, '(P2)*13/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0006', '2023-12-16 04:33:29', '001', 'S', 'Staff', 'E0007', 'Personal Allowance', 'Formula', 0.00, '(P2)*24/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0007', '2023-12-16 04:33:29', '001', 'S', 'Staff', 'E0008', 'Incentive Allowance', 'Amount', 500.00, NULL, NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0008', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0002', 'Basic Salary', 'Formula', 0.00, '(P1)*(50/100)', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0009', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0003', 'Dearness Allowance', 'Formula', 0.00, '(P2)*24/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0010', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0004', 'House Rent Allowance', 'Formula', 0.00, '(P2)*50/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0011', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0005', 'Conveyance Allowance', 'Formula', 0.00, '(P2)*2/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0012', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0006', 'Special Allowance', 'Formula', 0.00, '(P2)*13/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0013', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0007', 'Personal Allowance', 'Formula', 0.00, '(P2)*24/100', NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0014', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0008', 'Incentive Allowance', 'Amount', 500.00, NULL, NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0015', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0016', 'Performance Bonus', 'Formula', 0.00, NULL, NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0016', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0018', 'LTA', 'Amount', 0.00, NULL, NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0017', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0019', 'Gratuity', 'Amount', 0.00, NULL, NULL, NULL, NULL, 'Y', NULL, NULL),
('00001', '00001', 1, 'S0018', '2023-12-26 07:25:13', '001', 'S', 'Staff', 'E0022', 'C-OFF Allowance', 'Amount', 0.00, NULL, NULL, NULL, NULL, 'Y', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MEmployeeWorkProfiles`
--

CREATE TABLE `MEmployeeWorkProfiles` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `EmployeeId` int(5) NOT NULL,
  `DOJ` varchar(50) DEFAULT NULL,
  `DOL` varchar(50) DEFAULT NULL,
  `ContractorId` varchar(50) DEFAULT NULL,
  `ContractorStartDate` varchar(50) DEFAULT NULL,
  `ContractorEndDate` varchar(50) DEFAULT NULL,
  `DeptGroupId` varchar(50) DEFAULT NULL,
  `DeptId` varchar(50) DEFAULT NULL,
  `SubDeptId` varchar(50) DEFAULT NULL,
  `DesgId` varchar(50) DEFAULT NULL,
  `ReportingTo` varchar(50) DEFAULT NULL,
  `WeeklyOff` varchar(50) DEFAULT NULL,
  `ShiftId` varchar(50) DEFAULT NULL,
  `BandId` varchar(50) DEFAULT NULL,
  `ZoneId` varchar(50) DEFAULT NULL,
  `GradeId` varchar(50) DEFAULT NULL,
  `CostCenterId` varchar(50) DEFAULT NULL,
  `BondApplicable` varchar(1) DEFAULT 'N',
  `BondAttachment` varchar(500) DEFAULT NULL,
  `CurrentJob` varchar(500) DEFAULT NULL,
  `Remark` varchar(100) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(50) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `ModifiedBy` varchar(50) DEFAULT NULL,
  `ModifiedOn` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MEmployeeWorkProfiles`
--

INSERT INTO `MEmployeeWorkProfiles` (`CompanyId`, `BranchId`, `EmployeeId`, `DOJ`, `DOL`, `ContractorId`, `ContractorStartDate`, `ContractorEndDate`, `DeptGroupId`, `DeptId`, `SubDeptId`, `DesgId`, `ReportingTo`, `WeeklyOff`, `ShiftId`, `BandId`, `ZoneId`, `GradeId`, `CostCenterId`, `BondApplicable`, `BondAttachment`, `CurrentJob`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, '2010-09-27', '2023-10-29', 'Example 2', '2012-06-25', '2023-11-29', 'Example 1', 'Example 2', 'Example 3', 'Example 3', 'Example 3', 'Sunday', 'Example 4', 'Example 2', 'Example 3', 'Example 3', 'Cost Center 1', 't', '', '', 'remark', 'Y', '', '', '', ''),
('00001', '00001', 2, '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Y', '', '', '', ''),
('00001', '00001', 3, '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Y', '', '', '', ''),
('00001', '00001', 4, '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Y', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `MFinancialYears`
--

CREATE TABLE `MFinancialYears` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `FYearId` varchar(5) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `ShortName` varchar(100) DEFAULT NULL,
  `YearClose` varchar(1) NOT NULL DEFAULT 'N',
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL,
  `Remark` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MFinancialYears`
--

INSERT INTO `MFinancialYears` (`CompanyId`, `BranchId`, `FYearId`, `Name`, `StartDate`, `EndDate`, `ShortName`, `YearClose`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `Remark`) VALUES
('00001', '00001', '00001', '2023-2024', '2024-03-01 00:00:00', '2024-02-29 00:00:00', '2023', 'Y', 'Y', NULL, NULL, NULL, NULL, NULL),
('00001', '00001', '00002', '2022-2023', '2022-03-01 00:00:00', '2023-02-28 00:00:00', '2022', 'N', 'Y', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MHolidays`
--

CREATE TABLE `MHolidays` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `FYear` varchar(5) NOT NULL,
  `HolidayId` varchar(5) NOT NULL,
  `HolidayDate` date DEFAULT NULL,
  `IUFlag` varchar(255) DEFAULT NULL,
  `HolidayDescription` varchar(500) DEFAULT NULL,
  `HolidayType` varchar(10) DEFAULT 'P',
  `AcFlag` varchar(1) NOT NULL DEFAULT 'Y',
  `CreatedBy` varchar(500) NOT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL,
  `Remark` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MHolidays`
--

INSERT INTO `MHolidays` (`CompanyId`, `BranchId`, `FYear`, `HolidayId`, `HolidayDate`, `IUFlag`, `HolidayDescription`, `HolidayType`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `Remark`) VALUES
('00001', '00001', '2021', '00001', '2023-12-05', 'I', 'Holi', 'Unpaid', 'Y', '', '2023-12-19 17:59:43', NULL, NULL, 'remark');

-- --------------------------------------------------------

--
-- Table structure for table `MJobsResponsibilities`
--

CREATE TABLE `MJobsResponsibilities` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `JobResponsibilityId` int(7) NOT NULL,
  `JobResponsibilityName` varchar(500) NOT NULL,
  `Duration` int(11) DEFAULT 0,
  `Points` int(11) DEFAULT 0,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MJobsResponsibilities`
--

INSERT INTO `MJobsResponsibilities` (`CompanyId`, `BranchId`, `JobResponsibilityId`, `JobResponsibilityName`, `Duration`, `Points`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, 'Testing', 3, 12, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 3, 'Maintainence', 3, 12, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 5, 'Technician', 4, 46, 'remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 6, 'Network Enginner', 4, 46, 'remark', 'N', NULL, NULL, NULL, NULL),
('00001', '00001', 7, 'Technician', 4, 46, 'remark', 'N', NULL, NULL, NULL, NULL),
('00001', '00001', 8, 'Technician updated', 4, 46, 'remark', 'N', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MJobTypes`
--

CREATE TABLE `MJobTypes` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `JobTypeId` int(11) NOT NULL,
  `JobTypeName` varchar(50) DEFAULT NULL,
  `ShortName` varchar(2) DEFAULT NULL,
  `RateGroup` varchar(3) DEFAULT NULL,
  `RatePerDay` decimal(18,2) DEFAULT 0.00,
  `Category` varchar(20) DEFAULT 'Standard',
  `Position` int(11) DEFAULT 0,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MJobTypes`
--

INSERT INTO `MJobTypes` (`CompanyId`, `BranchId`, `JobTypeId`, `JobTypeName`, `ShortName`, `RateGroup`, `RatePerDay`, `Category`, `Position`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, 'Present', 'P', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-27 13:29:29', 'admin', '2022-01-27 13:29:29'),
('00001', '00001', 2, 'Absent', 'AB', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-27 13:34:00', 'admin', '2022-01-27 13:34:00'),
('00001', '00001', 3, 'Half Day', 'HF', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-27 14:16:18', 'admin', '2022-01-27 14:16:18'),
('00001', '00001', 4, 'Out Door Duty', 'OD', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-27 18:42:15', 'admin', '2022-01-29 10:36:15'),
('00001', '00001', 5, 'WeeklyOff', 'WO', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-27 18:44:24', 'admin', '2022-01-27 18:44:37'),
('00001', '00001', 6, 'Leaves', 'L', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-27 19:23:44', 'admin', '2022-01-27 19:23:44'),
('00001', '00001', 7, 'Holiday', 'HD', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-29 10:35:37', 'admin', '2022-01-29 10:35:37'),
('00001', '00001', 8, 'C-OFF', 'CF', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-29 10:35:37', 'admin', '2022-01-29 10:35:37'),
('00001', '00001', 9, 'Holiday Present', 'PH', '0', 0.00, 'Standard', 0, 'Remark', 'Y', 'admin', '2022-01-29 10:35:37', 'admin', '2022-01-29 10:35:37'),
('00001', '00001', 10, 'TRAVEL', 'T', '0', 0.00, 'Position', 0, 'Remark', 'Y', 'admin', '2022-01-29 10:35:37', 'admin', '2022-05-11 17:51:13'),
('00001', '00001', 11, 'halfday', 'hd', '0', 0.00, 'Standard', 0, 'hdd', 'N', 'admin', '2022-05-10 12:10:25', 'admin', '2022-05-10 12:19:19'),
('00001', '00001', 12, 'Half Day Present', 'HD', '0', 0.00, 'Standard', 1, 'hdp', 'N', 'admin', '2022-05-10 16:49:35', 'admin', '2022-05-10 16:50:51'),
('00001', '00001', 13, 'Half Day leave mon', 'hd', '0', 0.00, 'Standard', 0, 'hdl', 'N', 'admin', '2022-05-10 17:48:11', 'admin', '2022-05-10 17:48:30'),
('00001', '00001', 14, 'Gross', 'gs', '0', 0.00, 'Position', 1, 'dsfdf', 'Y', 'admin', '2022-05-11 17:51:50', 'admin', '2022-05-12 10:47:08'),
('00001', '00001', 15, 'HALF DAY LEAVE', 'HD', '2', 2.00, 'Position', 3, '2222', 'N', 'admin', '2022-05-12 10:47:56', 'admin', '2022-05-12 10:48:15');

-- --------------------------------------------------------

--
-- Table structure for table `MKRAs`
--

CREATE TABLE `MKRAs` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `KRAId` int(5) NOT NULL,
  `KRAName` varchar(500) NOT NULL,
  `Duration` int(11) DEFAULT 0,
  `Points` int(11) DEFAULT 0,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MKRAs`
--

INSERT INTO `MKRAs` (`CompanyId`, `BranchId`, `KRAId`, `KRAName`, `Duration`, `Points`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, 'KRA 1', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 2, 'KRA 2', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 3, 'KRA 3', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 4, 'KRA 4', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 5, 'KRA 5', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 7, 'KRA 6', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 8, 'KRA 7', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 9, 'KRA 8', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 10, 'KRA 9', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 11, 'KRA 10', 12, 54, 'remarks', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', 12, 'KRA 11', 45, 34, 'remark', 'N', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MLeaves`
--

CREATE TABLE `MLeaves` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `LeaveBalanceId` varchar(5) NOT NULL,
  `FYear` varchar(5) NOT NULL,
  `EmployeeId` varchar(5) NOT NULL,
  `EmployeeTypeId` varchar(5) DEFAULT NULL,
  `EmployeeType` varchar(10) DEFAULT NULL,
  `EmployeeTypeGroup` varchar(10) DEFAULT NULL,
  `LeaveTypeId` varchar(5) NOT NULL,
  `Month` varchar(5) DEFAULT NULL,
  `Year` varchar(5) DEFAULT NULL,
  `LeaveBalanceDate` datetime DEFAULT NULL,
  `EmployeeName` varchar(500) DEFAULT NULL,
  `LeaveTypeDesc` varchar(5) DEFAULT NULL,
  `OpeningBalance` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned1` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned2` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned3` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned4` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned5` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned6` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned7` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned8` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned9` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned10` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned11` decimal(10,2) DEFAULT 0.00,
  `LeaveEarned12` decimal(10,2) DEFAULT 0.00,
  `SanctionLeaveDays` decimal(10,2) DEFAULT 0.00,
  `LeaveBalance` decimal(10,2) DEFAULT 0.00,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) NOT NULL DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MLeaves`
--

INSERT INTO `MLeaves` (`CompanyId`, `BranchId`, `LeaveBalanceId`, `FYear`, `EmployeeId`, `EmployeeTypeId`, `EmployeeType`, `EmployeeTypeGroup`, `LeaveTypeId`, `Month`, `Year`, `LeaveBalanceDate`, `EmployeeName`, `LeaveTypeDesc`, `OpeningBalance`, `LeaveEarned1`, `LeaveEarned2`, `LeaveEarned3`, `LeaveEarned4`, `LeaveEarned5`, `LeaveEarned6`, `LeaveEarned7`, `LeaveEarned8`, `LeaveEarned9`, `LeaveEarned10`, `LeaveEarned11`, `LeaveEarned12`, `SanctionLeaveDays`, `LeaveBalance`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '00001', '2023', '1', '001', 'S', 'Staff', '0001', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'PL', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00002', '2023', '1', '001', 'S', 'Staff', '0002', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'CL', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00003', '2023', '1', '001', 'S', 'Staff', '0003', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'SL', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00004', '2023', '1', '001', 'S', 'Staff', '0004', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'LW', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00005', '2023', '1', '001', 'S', 'Staff', '0005', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'CF', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00006', '2023', '1', '001', 'S', 'Staff', '0006', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'HD', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00007', '2023', '1', '001', 'S', 'Staff', '0007', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'HD', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00008', '2023', '1', '001', 'S', 'Staff', '0008', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'UL', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00009', '2023', '1', '001', 'S', 'Staff', '0009', '12', '2023', '2023-12-29 00:00:00', 'Charles Leclerc', 'WO', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00010', '2023', '2', '004', 'O', 'Worker', '0001', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'PL', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00011', '2023', '2', '004', 'O', 'Worker', '0002', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'CL', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00012', '2023', '2', '004', 'O', 'Worker', '0003', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'SL', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00013', '2023', '2', '004', 'O', 'Worker', '0004', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'LW', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00014', '2023', '2', '004', 'O', 'Worker', '0005', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'CF', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00015', '2023', '2', '004', 'O', 'Worker', '0006', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'HD', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00016', '2023', '2', '004', 'O', 'Worker', '0007', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'HD', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00017', '2023', '2', '004', 'O', 'Worker', '0008', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'UL', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00018', '2023', '2', '004', 'O', 'Worker', '0009', '12', '2023', '2023-12-29 00:00:00', 'Bruce  Wayne', 'WO', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, '', 'Y', '', '0000-00-00 00:00:00', '', '0000-00-00 00:00:00'),
('00001', '00001', '00019', '2023', '4', '001', 'S', 'Staff', '0001', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'PL', 13.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 6.00, 6.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', '00020', '2023', '4', '001', 'S', 'Staff', '0002', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'CL', 6.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 4.00, 4.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', '00021', '2023', '4', '001', 'S', 'Staff', '0003', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'SL', 7.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 4.00, 4.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', '00022', '2023', '4', '001', 'S', 'Staff', '0004', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'LW', 11.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 9.00, 9.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', '00023', '2023', '4', '001', 'S', 'Staff', '0005', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'CF', 5.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 4.00, 4.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', '00024', '2023', '4', '001', 'S', 'Staff', '0006', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'HD', 8.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 5.00, 5.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', '00025', '2023', '4', '001', 'S', 'Staff', '0007', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'HD', 8.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 4.00, 4.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', '00026', '2023', '4', '001', 'S', 'Staff', '0008', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'UL', 6.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 5.00, 5.00, '', 'Y', '', NULL, '', NULL),
('00001', '00001', '00027', '2023', '4', '001', 'S', 'Staff', '0009', '12', '2023', '2023-12-29 00:00:00', 'Harshvardhan Reddy', 'WO', 7.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 5.00, 5.00, '', 'Y', '', NULL, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MLeaveTypes`
--

CREATE TABLE `MLeaveTypes` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `LeaveTypeId` varchar(5) NOT NULL,
  `LeaveType` varchar(500) DEFAULT NULL,
  `ShortName` varchar(2) DEFAULT NULL,
  `PaidFlag` varchar(10) DEFAULT 'P',
  `CarryForwardFlag` varchar(10) DEFAULT 'Y',
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MLeaveTypes`
--

INSERT INTO `MLeaveTypes` (`CompanyId`, `BranchId`, `LeaveTypeId`, `LeaveType`, `ShortName`, `PaidFlag`, `CarryForwardFlag`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '0001', 'Paid Leave', 'PL', 'U', 'Y', ' remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0002', 'Casual Leave', 'CL', 'P', 'Y', ' remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0003', 'Sick Leave', 'SL', 'P', 'Y', ' remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0004', 'Leave Without Payment', 'LW', 'U', 'N', ' remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0005', 'C-OFF', 'CF', 'P', 'Y', ' remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0006', 'Holiday', 'HD', 'P', 'N', ' remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0007', 'Half Day Leave', 'HD', 'P', 'Y', ' remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0008', 'Unpaid Leave', 'UL', 'U', 'Y', ' remark', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '0009', 'Weekly Off', 'WO', 'U', 'N', ' remark', 'Y', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MMasterNames`
--

CREATE TABLE `MMasterNames` (
  `MasterId` int(5) NOT NULL,
  `MasterName` varchar(50) NOT NULL,
  `AcFlag` varchar(1) DEFAULT NULL,
  `IUFlag` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MMasterNames`
--

INSERT INTO `MMasterNames` (`MasterId`, `MasterName`, `AcFlag`, `IUFlag`) VALUES
(1, 'M10', 'Y', NULL),
(2, 'M9', 'Y', NULL),
(3, 'M8', 'Y', NULL),
(4, 'M7', 'Y', NULL),
(5, 'M6', 'Y', NULL),
(6, 'CompanySector', 'Y', NULL),
(7, 'BandType', 'Y', NULL),
(8, 'Zone', 'Y', NULL),
(9, 'Currency Type', 'Y', NULL),
(10, 'BankAccountType', 'Y', NULL),
(11, 'Category', 'Y', NULL),
(12, 'Caste', 'Y', NULL),
(13, 'Religion', 'Y', NULL),
(14, 'Reference', 'Y', NULL),
(15, 'DepartmentGroup', 'Y', NULL),
(16, 'Salutation', 'Y', NULL),
(17, 'Employee Group Type', 'Y', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MProfessTax`
--

CREATE TABLE `MProfessTax` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `PTId` int(3) NOT NULL,
  `Gender` varchar(10) DEFAULT 'Male',
  `UpperLimit` decimal(10,2) DEFAULT 0.00,
  `LowerLimit` decimal(10,2) DEFAULT 0.00,
  `PTAmount` decimal(10,2) DEFAULT 0.00,
  `PTAmountFeb` decimal(18,2) DEFAULT 0.00,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `Remark` varchar(500) DEFAULT NULL,
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MProfessTax`
--

INSERT INTO `MProfessTax` (`CompanyId`, `BranchId`, `PTId`, `Gender`, `UpperLimit`, `LowerLimit`, `PTAmount`, `PTAmountFeb`, `AcFlag`, `Remark`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', 1, 'Female', 250000.00, 15000.00, 1231.00, 123.00, 'Y', 'text', NULL, '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
('00001', '00001', 2, 'Female', 250000.00, 15000.00, 1231.00, 123.00, 'Y', 'text', NULL, '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `MProfessTaxes`
--

CREATE TABLE `MProfessTaxes` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `PTId` int(3) NOT NULL,
  `Gender` varchar(10) DEFAULT 'Male',
  `UpperLimit` decimal(10,2) DEFAULT 0.00,
  `LowerLimit` decimal(10,2) DEFAULT 0.00,
  `PTAmount` decimal(10,2) DEFAULT 0.00,
  `PTAmountFeb` decimal(18,2) DEFAULT 0.00,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `Remark` varchar(500) DEFAULT NULL,
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MShifts`
--

CREATE TABLE `MShifts` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `ShiftId` varchar(5) NOT NULL,
  `EmployeeTypeGroupId` varchar(5) DEFAULT NULL,
  `EmployeeTypeId` varchar(3) DEFAULT NULL,
  `ShiftName` varchar(100) DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `OTStartTime` time DEFAULT NULL,
  `GraceEarlyTime` int(11) DEFAULT 0,
  `GraceLateTime` int(11) DEFAULT 0,
  `HalfdayHours` decimal(10,2) DEFAULT NULL,
  `FulldayHours` decimal(10,2) DEFAULT NULL,
  `AutoRotateFlag` varchar(1) DEFAULT 'Y',
  `TwoDayShift` varchar(1) DEFAULT 'Y',
  `ShiftGraceHoursMin` int(11) DEFAULT 0,
  `ShiftGraceHoursMax` int(11) DEFAULT 0,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MShifts`
--

INSERT INTO `MShifts` (`CompanyId`, `BranchId`, `ShiftId`, `EmployeeTypeGroupId`, `EmployeeTypeId`, `ShiftName`, `StartTime`, `EndTime`, `OTStartTime`, `GraceEarlyTime`, `GraceLateTime`, `HalfdayHours`, `FulldayHours`, `AutoRotateFlag`, `TwoDayShift`, `ShiftGraceHoursMin`, `ShiftGraceHoursMax`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '00001', '00001', '001', 'S-I', '08:00:00', '16:00:00', '17:15:00', 10, 10, 4.50, 6.50, 'N', 'N', -2, 2, 'Remark', 'Y', 'admin', '2021-12-31 10:52:03', 'admin', '2022-01-07 13:05:28'),
('00001', '00001', '00002', '00001', '001', 'S-II', '16:00:00', '23:59:00', '18:15:00', 10, 10, 4.50, 6.50, 'N', 'N', -2, 2, 'Remark', 'Y', 'admin', '2021-12-31 14:20:19', 'admin', '2022-01-18 14:15:45'),
('00001', '00001', '00003', '00002', '002', 'W-I', '08:00:00', '16:00:00', '16:15:00', 15, 15, 5.00, 7.00, 'Y', 'N', -2, 2, 'Remark', 'Y', 'admin', '2021-12-31 14:34:48', 'admin', '2022-01-12 10:17:08'),
('00001', '00001', '00004', '00002', '002', 'W-II', '16:00:00', '23:59:00', '12:15:00', 10, 10, 5.00, 7.00, 'Y', 'Y', -2, 2, 'Remark', 'Y', 'admin', '2022-01-03 17:20:44', 'admin', '2022-01-03 17:20:44'),
('00001', '00001', '00005', '00002', '002', 'W-III', '00:00:00', '08:00:00', '08:15:00', 10, 10, 5.00, 7.00, 'Y', 'Y', -2, 2, 'Remark', 'Y', 'admin', '2022-01-03 18:22:32', 'admin', '2022-01-18 15:09:43'),
('00001', '00001', '00006', '00001', '001', 'S-3', '00:00:00', '08:00:00', '15:46:19', 10, 10, 4.50, 6.50, 'N', 'N', -2, 2, 'Remark', 'Y', 'admin', '2022-01-07 13:03:19', 'admin', '2022-01-07 13:03:19'),
('00001', '00001', '00007', '00001', '001', 'G-8', '08:00:00', '17:00:00', '15:47:16', 10, 10, 4.50, 6.50, 'N', 'N', -2, 2, 'Remark', 'Y', 'admin', '2022-01-11 17:07:41', 'admin', '2022-01-11 17:07:41'),
('00001', '00001', '00008', '00001', '001', 'G-9', '09:00:00', '18:00:00', '15:48:04', 10, 10, 4.50, 6.50, 'N', 'N', -2, 2, 'Remark', 'Y', 'admin', '2022-01-12 09:47:57', 'admin', '2022-01-18 15:07:57'),
('00001', '00001', '00009', '00002', '002', 'DAY', '08:00:00', '20:00:00', '20:15:00', 10, 10, 8.00, 11.00, 'Y', 'N', -2, 2, 'Remark', 'Y', 'admin', '2022-01-12 12:30:55', 'admin', '2022-01-18 14:14:26'),
('00001', '00001', '00010', '00002', '002', 'NIGHT', '20:00:00', '08:00:00', '10:30:00', 10, 10, 8.00, 11.00, 'Y', 'Y', -2, 2, 'Remark', 'Y', 'admin', '2022-01-12 15:14:42', 'admin', '2022-01-18 13:17:35'),
('00001', '00001', '00011', '00001', '004', 'G-9:30', '09:30:00', '18:30:00', '16:48:00', 10, 10, 4.50, 6.50, 'N', 'N', -2, 4, 'Remark', 'N', 'admin', '2022-01-12 09:47:57', 'admin', '2022-05-10 12:24:49'),
('00001', '00001', '00012', '00002', '002', 'w-1', '17:43:00', '18:44:00', '16:44:00', 0, 0, 8.00, 12.00, 'Y', 'Y', 1, 2, '2', 'N', 'admin', '2022-05-10 15:44:51', 'admin', '2022-05-10 15:45:43'),
('00001', '00001', '00013', '00001', '005', '1st', '20:30:00', '18:30:00', '20:36:00', 0, 0, 6.00, 12.00, 'N', 'Y', 5, 9, 'hd', 'Y', 'admin', '2022-05-10 16:31:22', 'admin', '2022-05-12 10:49:43'),
('00001', '00001', '00014', '00001', '001', 'NIGHT SHIFT', '10:50:00', '23:04:00', '13:50:00', 4, 5, 5.00, 8.00, 'N', 'Y', 5, 5, '2345', 'N', 'admin', '2022-05-12 10:51:05', 'admin', '2022-05-12 10:51:35'),
('00001', '00001', '00015', NULL, '001', 'Test new', '09:00:00', '05:00:00', '05:00:00', 10, 10, 4.50, 0.00, '', '', 0, 0, '', 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00016', NULL, '001', 'Test new', '13:02:00', '09:04:00', '08:04:00', 10, 10, 4.50, 0.00, 'N', 'N', 0, 0, '', 'Y', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MTwoFields`
--

CREATE TABLE `MTwoFields` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `FieldId` varchar(5) NOT NULL,
  `MasterName` varchar(5) NOT NULL DEFAULT '00001',
  `FieldDetails` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL,
  `Remark` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MTwoFields`
--

INSERT INTO `MTwoFields` (`CompanyId`, `BranchId`, `FieldId`, `MasterName`, `FieldDetails`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `Remark`) VALUES
('00001', '00001', '00001', '00001', 'Staff', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00002', '00001', 'Worker', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00013', '00004', 'Mr.', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00014', '00004', 'Ms.', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00015', '00004', 'Mrs.', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00016', '00004', 'Miss', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00017', '00004', 'Dr.', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00018', '00004', 'Prof.', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00019', '00005', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00020', '00005', 'Administration', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00021', '00005', 'Production', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00022', '00005', 'Support', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00023', '00005', 'Services', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00024', '00006', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00025', '00006', 'Reference1', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00026', '00006', 'Reference2', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00027', '00006', 'Reference3', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00028', '00007', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00029', '00007', 'Hindu', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00030', '00007', 'Muslim', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00031', '00007', 'Shikh', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00032', '00007', 'Christians', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00033', '00008', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00034', '00008', 'UNSKILLED', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00035', '00008', 'SEMISKILLED', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00036', '00008', 'SKILEED', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00037', '00008', 'Category4', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00038', '00008', 'Category5', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00039', '00009', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00040', '00009', 'Caste1', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00041', '00009', 'Caste2', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00042', '00009', 'Caste3', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00043', '00009', 'Caste4', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00044', '00009', 'Caste5', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00045', '00009', 'Caste6', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00046', '00009', 'Caste7', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00047', '00009', 'Caste8', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00048', '00009', 'Caste9', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00049', '00009', 'Caste10', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00050', '00010', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00051', '00010', 'Current', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00052', '00010', 'Saving', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00053', '00010', 'Salary', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00054', '00010', 'CashCredit', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00055', '00010', 'OverDue', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00056', '00010', 'Loans', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00057', '00010', 'Fixed Deposit', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00058', '00010', 'Foreign currency non-resident (FCNR) account', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00059', '00011', 'Indian Rupees', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00060', '00011', 'U.S. Dollar (USD)', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00061', '00011', 'European Euro (EUR)', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00062', '00011', 'Japanese Yen (JPY)', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00063', '00011', 'British Pound (GBP)', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00064', '00011', 'Australian/New Zealand Dollar', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00065', '00011', 'South African Rand (ZAR)', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00066', '00011', 'Chinese yuan', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00067', '00011', 'United Arab Emirates dirham', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00068', '00011', 'Currency1', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00069', '00011', 'Currency2', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00070', '00011', 'Currency3', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00071', '00012', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00072', '00012', 'Zone1', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00073', '00012', 'Zone2', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00074', '00012', 'Zone3', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00075', '00012', 'Zone4', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00076', '00012', 'Zone5', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00077', '00014', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00078', '00014', 'Manufacturing', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00079', '00014', 'Service Industry', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00080', '00014', 'Engineering', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00081', '00014', 'Automation', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00082', '00014', 'Food Processing', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00083', '00014', 'Information Technology', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00084', '00014', 'Pharmaceuticals', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00085', '00014', 'FMCG', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00086', '00013', 'NA', 'Y', '00001', '2021-04-01 00:00:00', '00001', '2021-04-01 00:00:00', NULL),
('00001', '00001', '00087', '00019', 'Information Techology', 'Y', 'admin', '2022-05-05 16:13:40', 'admin', '2022-05-05 16:13:40', 'done'),
('Compa', 'Branc', 'Field', 'Maste', 'FieldDetails', 'A', 'CreatedBy', '0000-00-00 00:00:00', 'ModifiedBy', '0000-00-00 00:00:00', 'Remark');

-- --------------------------------------------------------

--
-- Table structure for table `MWeeklyOffs`
--

CREATE TABLE `MWeeklyOffs` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `WeeklyOffId` varchar(5) NOT NULL,
  `WeeklyOffName` varchar(500) NOT NULL,
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MWeeklyOffs`
--

INSERT INTO `MWeeklyOffs` (`CompanyId`, `BranchId`, `WeeklyOffId`, `WeeklyOffName`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '00001', 'Sunday', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00002', 'Monday', NULL, 'N', NULL, NULL, NULL, NULL),
('00001', '00001', '00003', 'Tuesday', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00004', 'Wednesday test', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00005', 'Thursday', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00006', 'Friday', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00007', 'Saturday', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00008', 'Saturday & Sunday', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00009', 'First -Third Saturday & SunDay', NULL, 'Y', NULL, NULL, NULL, NULL),
('00001', '00001', '00010', 'Second -Forth Saturday ', NULL, 'N', NULL, NULL, 'admin', '2022-05-10 12:28:10'),
('00001', '00001', '00011', 'Monday and Friday', 'MandFriday', 'N', 'admin', '2022-05-10 16:36:17', 'admin', '2022-05-10 16:37:12'),
('00001', '00001', '00012', 'Monday and Thursday', 'MandT', 'Y', 'admin', '2022-05-10 16:47:39', 'admin', '2022-05-10 16:47:39'),
('00001', '00001', '00013', 'FRIADAY AND SA', 'FANDS', 'N', 'admin', '2022-05-12 10:53:10', 'admin', '2022-05-12 10:53:50');

-- --------------------------------------------------------

--
-- Table structure for table `TAdvanceRequests`
--

CREATE TABLE `TAdvanceRequests` (
  `CompanyId` int(11) NOT NULL DEFAULT 1,
  `BranchId` int(11) NOT NULL DEFAULT 1,
  `AdvanceId` int(11) NOT NULL,
  `AdvanceDate` datetime DEFAULT NULL,
  `EmployeeName` varchar(255) NOT NULL,
  `FYear` varchar(255) NOT NULL,
  `AdvanceType` varchar(255) DEFAULT 'Official',
  `Amount` decimal(18,2) DEFAULT 0.00,
  `Installment` int(11) DEFAULT 0,
  `Purpose` varchar(255) DEFAULT NULL,
  `ProjectId` int(11) DEFAULT NULL,
  `AdvanceStatus` varchar(255) DEFAULT NULL,
  `AMonth` varchar(255) DEFAULT NULL,
  `AYear` int(11) DEFAULT NULL,
  `ApprovalFlag` varchar(255) DEFAULT 'Pending',
  `Remark` varchar(255) DEFAULT NULL,
  `AcFlag` varchar(255) NOT NULL DEFAULT 'Y',
  `CreatedBy` varchar(255) DEFAULT '',
  `CreatedOn` datetime NOT NULL,
  `ModifiedBy` varchar(255) DEFAULT NULL,
  `ModifiedOn` datetime NOT NULL,
  `ApprovedBy` varchar(255) DEFAULT NULL,
  `ApprovedAmount` decimal(18,2) DEFAULT 0.00,
  `ApprovedInstallments` int(11) DEFAULT 1,
  `RejectedBy` varchar(255) DEFAULT NULL,
  `RejectReason` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `TAdvanceRequests`
--

INSERT INTO `TAdvanceRequests` (`CompanyId`, `BranchId`, `AdvanceId`, `AdvanceDate`, `EmployeeName`, `FYear`, `AdvanceType`, `Amount`, `Installment`, `Purpose`, `ProjectId`, `AdvanceStatus`, `AMonth`, `AYear`, `ApprovalFlag`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `ApprovedBy`, `ApprovedAmount`, `ApprovedInstallments`, `RejectedBy`, `RejectReason`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2023-12-05 00:00:00', 'Jesus', '', 'Official', 2500.00, 3, 'Medical', 2, 'Repayment', 'April', 2024, 'Approved', 'text', 'Y', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00', 'User1', 2000.00, 1, NULL, NULL, '2023-12-08 16:55:50', '2023-12-08 17:32:30'),
(1, 1, 2, '2023-12-18 00:00:00', 'Bruce Wayne', '', 'Personal', 2000.00, 2, 'reason', 3, 'Complete', 'June', 2024, 'Rejected', 'demon slayer', 'Y', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00', NULL, 0.00, 1, 'Nightingale', '123', '2023-12-08 16:56:33', '2023-12-08 17:31:45'),
(1, 1, 3, '2023-12-26 00:00:00', 'Harshvardhan Reddy', '', 'Official', 7000.00, 3, 'Vacation', 3, 'Pending', 'January', 2024, 'Pending', 'Remark', 'Y', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00', NULL, 0.00, 1, NULL, NULL, '2023-12-26 06:02:14', '2023-12-26 06:02:14');

-- --------------------------------------------------------

--
-- Table structure for table `TEmployeeGatepasses`
--

CREATE TABLE `TEmployeeGatepasses` (
  `CompanyId` varchar(255) NOT NULL DEFAULT '00001',
  `BranchId` varchar(255) NOT NULL DEFAULT '00001',
  `FYear` varchar(255) NOT NULL,
  `GatepassId` varchar(255) NOT NULL,
  `GatepassDate` datetime DEFAULT NULL,
  `EmployeeId` varchar(255) NOT NULL,
  `EmployeeType` varchar(255) NOT NULL,
  `EmployeeTypeGroup` varchar(255) NOT NULL,
  `InTime` datetime DEFAULT NULL,
  `OutTime` datetime DEFAULT NULL,
  `GatepassType` varchar(255) DEFAULT 'P',
  `Purpose` varchar(1000) DEFAULT NULL,
  `RejectReason` varchar(1000) DEFAULT NULL,
  `SanctionBy` varchar(255) DEFAULT NULL,
  `Remark` varchar(1000) DEFAULT NULL,
  `ApprovalFlag` varchar(255) DEFAULT 'P',
  `AcFlag` varchar(255) NOT NULL DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT '',
  `CreatedOn` datetime NOT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `TEmployeeGatepasses`
--

INSERT INTO `TEmployeeGatepasses` (`CompanyId`, `BranchId`, `FYear`, `GatepassId`, `GatepassDate`, `EmployeeId`, `EmployeeType`, `EmployeeTypeGroup`, `InTime`, `OutTime`, `GatepassType`, `Purpose`, `RejectReason`, `SanctionBy`, `Remark`, `ApprovalFlag`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `createdAt`, `updatedAt`) VALUES
('00001', '00001', '2023', '00001', '0000-00-00 00:00:00', '3', '', '', '2023-12-05 08:03:00', '2023-12-13 09:03:00', 'Personal', NULL, NULL, NULL, 'text', 'P', 'Y', '', '2023-12-28 07:04:25', NULL, '0000-00-00 00:00:00', '2023-12-28 07:04:25', '2023-12-28 07:04:25'),
('00001', '00001', '2023', '00002', '2023-12-04 00:00:00', '3', '', '', '2023-12-10 07:18:00', '2023-12-13 10:30:00', 'Personal', NULL, NULL, NULL, 'text', 'P', 'Y', '', '2023-12-28 07:18:47', NULL, '0000-00-00 00:00:00', '2023-12-28 07:18:47', '2023-12-28 07:18:47');

-- --------------------------------------------------------

--
-- Table structure for table `TLeaves`
--

CREATE TABLE `TLeaves` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `FYear` varchar(5) NOT NULL,
  `LeaveApplicationId` varchar(20) NOT NULL,
  `LeaveApplicationDate` datetime NOT NULL,
  `EmployeeId` varchar(5) NOT NULL,
  `EmployeeType` varchar(10) NOT NULL,
  `EmployeeTypeGroup` varchar(5) NOT NULL,
  `LeaveFromDate` datetime NOT NULL,
  `LeaveToDate` datetime NOT NULL,
  `LeaveTypeId` varchar(5) NOT NULL,
  `LeaveDays` decimal(10,2) NOT NULL DEFAULT 0.00,
  `SanctionBy` varchar(5) DEFAULT NULL,
  `SanctionFromDate` datetime DEFAULT NULL,
  `SanctionToDate` datetime DEFAULT NULL,
  `SanctionLeaveDays` decimal(10,2) DEFAULT 0.00,
  `Remark` varchar(1000) DEFAULT NULL,
  `ApprovalFlag` varchar(1) DEFAULT 'P',
  `AcFlag` varchar(1) NOT NULL DEFAULT 'Y',
  `CreatedBy` varchar(500) DEFAULT '',
  `CreatedOn` datetime NOT NULL,
  `ModifiedBy` varchar(500) DEFAULT NULL,
  `ModifiedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `TLeaves`
--

INSERT INTO `TLeaves` (`CompanyId`, `BranchId`, `FYear`, `LeaveApplicationId`, `LeaveApplicationDate`, `EmployeeId`, `EmployeeType`, `EmployeeTypeGroup`, `LeaveFromDate`, `LeaveToDate`, `LeaveTypeId`, `LeaveDays`, `SanctionBy`, `SanctionFromDate`, `SanctionToDate`, `SanctionLeaveDays`, `Remark`, `ApprovalFlag`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
('00001', '00001', '2023', '2023-LA00001', '2023-12-06 00:00:00', '1', 'S', 'Staff', '2023-12-13 00:00:00', '2023-12-16 00:00:00', '0001', 4.00, '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0.00, 'remark', 'A', 'Y', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
('00001', '00001', '2023', '2023-LA00002', '2023-12-06 00:00:00', '2', 'S', 'Staff', '2023-12-13 00:00:00', '2023-12-16 00:00:00', '0001', 4.00, '1', '2023-01-16 00:00:00', '2023-01-30 00:00:00', 0.00, 'remark', 'A', 'Y', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
('00001', '00001', '2023', '2023-LA00003', '2023-12-06 00:00:00', '4', 'S', 'Staff', '2023-12-13 00:00:00', '2023-12-16 00:00:00', '0001', 4.00, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0.00, 'remark', 'P', 'N', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
('00001', '00001', '2023', '2023-LA00004', '2023-12-25 00:00:00', '4', 'S', 'Staff', '2023-12-27 00:00:00', '2023-12-30 00:00:00', '0002', 4.00, '1', '2023-12-27 00:00:00', '2023-12-30 00:00:00', 0.00, '4', 'A', 'Y', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
('00001', '00001', '2023', '2023-LA00005', '2023-12-12 00:00:00', '3', 'S', 'Staff', '2023-12-25 00:00:00', '2023-12-29 00:00:00', '0002', 0.00, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0.00, 'Remark', 'P', 'Y', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
('00001', '00001', '2023', '2023-LA00006', '2023-12-28 00:00:00', '4', 'S', 'Staff', '2023-12-29 00:00:00', '2024-01-03 00:00:00', '0002', 6.00, '1', '2023-12-29 00:00:00', '2024-01-03 00:00:00', 6.00, 'Remark', 'A', 'Y', '', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `TManualAttendances`
--

CREATE TABLE `TManualAttendances` (
  `CompanyId` varchar(5) NOT NULL DEFAULT '00001',
  `BranchId` varchar(5) NOT NULL DEFAULT '00001',
  `AttendanceId` varchar(5) NOT NULL,
  `FYear` varchar(5) DEFAULT NULL,
  `EmployeeTypeId` varchar(5) NOT NULL,
  `JobTypeId` varchar(5) NOT NULL DEFAULT '00001',
  `ShiftId` varchar(5) NOT NULL,
  `EmployeeId` varchar(5) NOT NULL,
  `EmployeeTypeGroup` varchar(10) DEFAULT NULL,
  `AttendanceDate` datetime DEFAULT NULL,
  `InTime` datetime DEFAULT NULL,
  `OutTime` datetime DEFAULT NULL,
  `AttendanceFlag` varchar(1) DEFAULT 'E',
  `Remark` varchar(500) DEFAULT NULL,
  `AcFlag` varchar(1) DEFAULT 'Y',
  `CreatedBy` varchar(5) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedBy` varchar(5) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL,
  `ApprovalFlag` varchar(1) DEFAULT 'P',
  `SanctionBy` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `TManualAttendances`
--

INSERT INTO `TManualAttendances` (`CompanyId`, `BranchId`, `AttendanceId`, `FYear`, `EmployeeTypeId`, `JobTypeId`, `ShiftId`, `EmployeeId`, `EmployeeTypeGroup`, `AttendanceDate`, `InTime`, `OutTime`, `AttendanceFlag`, `Remark`, `AcFlag`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`, `ApprovalFlag`, `SanctionBy`) VALUES
('00001', '00001', '00001', '2022', '2', '5', '00003', '2', '', NULL, '2023-12-23 06:39:00', '2023-12-24 09:40:00', 'E', 'text', 'Y', NULL, '2023-12-23 06:40:09', NULL, NULL, 'A', 'User '),
('00001', '00001', '00002', '2023', '1', '4', '00002', '1', '', NULL, '2023-12-17 06:41:00', '2023-12-18 06:41:00', 'E', 'text', 'Y', NULL, '2023-12-23 06:41:59', NULL, NULL, 'P', 'User '),
('00001', '00001', '00003', '2023', '', '1', '00008', '', '', '2023-12-26 00:00:00', '2023-12-26 05:34:00', '2023-12-26 11:34:00', 'E', '', 'Y', NULL, '2023-12-26 05:34:24', NULL, NULL, 'P', '');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(9, 'Udayan Gaikwad ', 'ggwpfax', '$2b$10$sXrNMfhF2OqpGRIqXgr9jurInLaT4LSMlVd5iLdUAQ8U98APwChTu', 'Admin', '2023-09-14 05:56:21', '2023-09-14 05:56:21'),
(10, 'Willy Wonka', 'willywonka123', '$2b$10$80pAnmhxbd6Tn0fuAOh10OeBTqJ7Ws3AkH7Tlr8JgGkoGAxhs9jCa', 'Employee', '2023-09-14 05:57:29', '2023-09-14 05:57:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CompanyConfigs`
--
ALTER TABLE `CompanyConfigs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `EDImports`
--
ALTER TABLE `EDImports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MBanks`
--
ALTER TABLE `MBanks`
  ADD PRIMARY KEY (`BankId`);

--
-- Indexes for table `MCaderwiseDeductions`
--
ALTER TABLE `MCaderwiseDeductions`
  ADD PRIMARY KEY (`CaderwiseDeductionId`,`CompanyId`,`BranchId`,`DeductionHeadID`,`EmployeeType`) USING BTREE;

--
-- Indexes for table `MCaderwiseEarnings`
--
ALTER TABLE `MCaderwiseEarnings`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`CaderwiseEarningId`,`EmployeeTypeId`,`EarningHeadId`);

--
-- Indexes for table `MCompanies`
--
ALTER TABLE `MCompanies`
  ADD PRIMARY KEY (`CompanyId`);

--
-- Indexes for table `MCostCenter`
--
ALTER TABLE `MCostCenter`
  ADD PRIMARY KEY (`CostCenterId`);

--
-- Indexes for table `MDeductionHeads`
--
ALTER TABLE `MDeductionHeads`
  ADD PRIMARY KEY (`DeductionHeadID`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MDepartments`
--
ALTER TABLE `MDepartments`
  ADD PRIMARY KEY (`DepartmentId`);

--
-- Indexes for table `MDesignations`
--
ALTER TABLE `MDesignations`
  ADD PRIMARY KEY (`DesignationId`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MDevices`
--
ALTER TABLE `MDevices`
  ADD PRIMARY KEY (`DeviceId`);

--
-- Indexes for table `MEarningHeads`
--
ALTER TABLE `MEarningHeads`
  ADD PRIMARY KEY (`EarningHeadId`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MEmployeeAcademics`
--
ALTER TABLE `MEmployeeAcademics`
  ADD PRIMARY KEY (`EmployeeId`);

--
-- Indexes for table `MEmployeeFamilies`
--
ALTER TABLE `MEmployeeFamilies`
  ADD PRIMARY KEY (`EmployeeId`);

--
-- Indexes for table `MEmployeeGrades`
--
ALTER TABLE `MEmployeeGrades`
  ADD PRIMARY KEY (`EmployeeGradeId`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MEmployeeProfessionals`
--
ALTER TABLE `MEmployeeProfessionals`
  ADD PRIMARY KEY (`EmployeeId`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MEmployees`
--
ALTER TABLE `MEmployees`
  ADD PRIMARY KEY (`EmployeeId`);

--
-- Indexes for table `MEmployeeSalaries`
--
ALTER TABLE `MEmployeeSalaries`
  ADD PRIMARY KEY (`EmployeeId`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MEmployeeTypes`
--
ALTER TABLE `MEmployeeTypes`
  ADD PRIMARY KEY (`EmployeeTypeId`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MEmployeewiseDeduction`
--
ALTER TABLE `MEmployeewiseDeduction`
  ADD PRIMARY KEY (`EmployeewiseDeductionId`);

--
-- Indexes for table `MEmployeewiseDeductions`
--
ALTER TABLE `MEmployeewiseDeductions`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`EmployeeId`,`EmployeewiseDeductionId`,`EmployeeTypeId`,`DeductionHeadId`);

--
-- Indexes for table `MEmployeewiseEarnings`
--
ALTER TABLE `MEmployeewiseEarnings`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`EmployeeId`,`EmployeewiseEarningId`,`EmployeeTypeId`,`EarningHeadId`);

--
-- Indexes for table `MEmployeeWorkProfiles`
--
ALTER TABLE `MEmployeeWorkProfiles`
  ADD PRIMARY KEY (`EmployeeId`);

--
-- Indexes for table `MFinancialYears`
--
ALTER TABLE `MFinancialYears`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`FYearId`);

--
-- Indexes for table `MHolidays`
--
ALTER TABLE `MHolidays`
  ADD PRIMARY KEY (`HolidayId`);

--
-- Indexes for table `MJobsResponsibilities`
--
ALTER TABLE `MJobsResponsibilities`
  ADD PRIMARY KEY (`JobResponsibilityId`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MJobTypes`
--
ALTER TABLE `MJobTypes`
  ADD PRIMARY KEY (`JobTypeId`);

--
-- Indexes for table `MKRAs`
--
ALTER TABLE `MKRAs`
  ADD PRIMARY KEY (`KRAId`,`CompanyId`,`BranchId`) USING BTREE;

--
-- Indexes for table `MLeaves`
--
ALTER TABLE `MLeaves`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`LeaveBalanceId`,`FYear`,`EmployeeId`,`LeaveTypeId`);

--
-- Indexes for table `MLeaveTypes`
--
ALTER TABLE `MLeaveTypes`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`LeaveTypeId`);

--
-- Indexes for table `MMasterNames`
--
ALTER TABLE `MMasterNames`
  ADD PRIMARY KEY (`MasterId`);

--
-- Indexes for table `MProfessTax`
--
ALTER TABLE `MProfessTax`
  ADD PRIMARY KEY (`PTId`);

--
-- Indexes for table `MProfessTaxes`
--
ALTER TABLE `MProfessTaxes`
  ADD PRIMARY KEY (`PTId`);

--
-- Indexes for table `MShifts`
--
ALTER TABLE `MShifts`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`ShiftId`);

--
-- Indexes for table `MTwoFields`
--
ALTER TABLE `MTwoFields`
  ADD PRIMARY KEY (`FieldId`);

--
-- Indexes for table `MWeeklyOffs`
--
ALTER TABLE `MWeeklyOffs`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`WeeklyOffId`);

--
-- Indexes for table `TAdvanceRequests`
--
ALTER TABLE `TAdvanceRequests`
  ADD PRIMARY KEY (`AdvanceId`);

--
-- Indexes for table `TEmployeeGatepasses`
--
ALTER TABLE `TEmployeeGatepasses`
  ADD PRIMARY KEY (`GatepassId`);

--
-- Indexes for table `TLeaves`
--
ALTER TABLE `TLeaves`
  ADD PRIMARY KEY (`CompanyId`,`BranchId`,`FYear`,`LeaveApplicationId`);

--
-- Indexes for table `TManualAttendances`
--
ALTER TABLE `TManualAttendances`
  ADD PRIMARY KEY (`AttendanceId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CompanyConfigs`
--
ALTER TABLE `CompanyConfigs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `EDImports`
--
ALTER TABLE `EDImports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MBanks`
--
ALTER TABLE `MBanks`
  MODIFY `BankId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `MCostCenter`
--
ALTER TABLE `MCostCenter`
  MODIFY `CostCenterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `MDepartments`
--
ALTER TABLE `MDepartments`
  MODIFY `DepartmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `MDesignations`
--
ALTER TABLE `MDesignations`
  MODIFY `DesignationId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `MEmployeeAcademics`
--
ALTER TABLE `MEmployeeAcademics`
  MODIFY `EmployeeId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `MEmployeeFamilies`
--
ALTER TABLE `MEmployeeFamilies`
  MODIFY `EmployeeId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `MEmployeeGrades`
--
ALTER TABLE `MEmployeeGrades`
  MODIFY `EmployeeGradeId` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `MEmployeeProfessionals`
--
ALTER TABLE `MEmployeeProfessionals`
  MODIFY `EmployeeId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `MEmployees`
--
ALTER TABLE `MEmployees`
  MODIFY `EmployeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `MEmployeeSalaries`
--
ALTER TABLE `MEmployeeSalaries`
  MODIFY `EmployeeId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `MEmployeeWorkProfiles`
--
ALTER TABLE `MEmployeeWorkProfiles`
  MODIFY `EmployeeId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `MJobsResponsibilities`
--
ALTER TABLE `MJobsResponsibilities`
  MODIFY `JobResponsibilityId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `MJobTypes`
--
ALTER TABLE `MJobTypes`
  MODIFY `JobTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `MKRAs`
--
ALTER TABLE `MKRAs`
  MODIFY `KRAId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `MMasterNames`
--
ALTER TABLE `MMasterNames`
  MODIFY `MasterId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `MProfessTax`
--
ALTER TABLE `MProfessTax`
  MODIFY `PTId` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `MProfessTaxes`
--
ALTER TABLE `MProfessTaxes`
  MODIFY `PTId` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TAdvanceRequests`
--
ALTER TABLE `TAdvanceRequests`
  MODIFY `AdvanceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
